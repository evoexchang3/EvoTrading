#!/usr/bin/env node

/**
 * Secrets/Webhooks Replacer CLI
 * 
 * Works with secrets-manifest.yml to audit, explain, and safely replace secrets.
 * NEVER prints actual secret values - only masked versions.
 * 
 * Commands:
 *   audit                              - List all keys/webhooks with purpose and file references
 *   explain <KEY|WEBHOOK_ID>           - Show details about a specific key
 *   dry-run --from <src> --target <tgt> - Show what would change (masked)
 *   apply --from <src> --target <tgt> --backup - Atomic write with timestamped backup
 * 
 * Exit codes:
 *   0 - Success
 *   1 - Error
 *   2 - Differences detected (dry-run only)
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const MANIFEST_PATH = path.join(__dirname, '../../secrets-manifest.yml');

// Validation patterns
const VALIDATORS = {
  https_url: (val) => {
    if (!val) return { valid: false, error: 'URL is required' };
    if (!val.startsWith('https://')) return { valid: false, error: 'Must use HTTPS protocol' };
    try {
      new URL(val);
      return { valid: true };
    } catch (e) {
      return { valid: false, error: 'Invalid URL format' };
    }
  },
  
  hex64: (val) => {
    if (!val) return { valid: false, error: 'Value is required' };
    if (!/^[a-fA-F0-9]{64}$/.test(val)) {
      return { valid: false, error: 'Must be exactly 64 hexadecimal characters' };
    }
    return { valid: true };
  },
  
  hex_min32: (val) => {
    if (!val) return { valid: false, error: 'Value is required' };
    if (!/^[a-fA-F0-9]{32,}$/.test(val)) {
      return { valid: false, error: 'Must be at least 32 hexadecimal characters' };
    }
    return { valid: true };
  },
  
  postgres_url: (val) => {
    if (!val) return { valid: false, error: 'Database URL is required' };
    if (!val.startsWith('postgresql://') && !val.startsWith('postgres://')) {
      return { valid: false, error: 'Must start with postgresql:// or postgres://' };
    }
    if (!val.includes('sslmode=require')) {
      return { valid: false, error: 'Must include ?sslmode=require parameter' };
    }
    return { valid: true };
  },
  
  positive_integer: (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num <= 0) {
      return { valid: false, error: 'Must be a positive integer' };
    }
    return { valid: true };
  }
};

function maskValue(value) {
  if (!value) return '<not set>';
  if (value.length <= 8) return '***';
  return value.substring(0, 4) + '...' + value.substring(value.length - 4);
}

function loadManifest() {
  try {
    const content = fs.readFileSync(MANIFEST_PATH, 'utf8');
    return yaml.parse(content);
  } catch (error) {
    console.error('Error loading secrets-manifest.yml:', error.message);
    process.exit(1);
  }
}

function loadEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    
    content.split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;
      
      const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (match) {
        env[match[1]] = match[2];
      }
    });
    
    return env;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    process.exit(1);
  }
}

function validateValue(envVar, value) {
  const errors = [];
  
  // Determine validation type based on variable name and manifest info
  if (envVar.name === 'DATABASE_URL') {
    const result = VALIDATORS.postgres_url(value);
    if (!result.valid) errors.push(result.error);
  } else if (envVar.name === 'WEBHOOK_SECRET' || envVar.name === 'SITE_WEBHOOK_SECRET') {
    const result = VALIDATORS.hex64(value);
    if (!result.valid) errors.push(result.error);
  } else if (envVar.name === 'JWT_ACCESS_SECRET' || envVar.name === 'JWT_REFRESH_SECRET' || envVar.name === 'CRM_SERVICE_TOKEN') {
    const result = VALIDATORS.hex_min32(value);
    if (!result.valid) errors.push(result.error);
  } else if (envVar.name === 'CRM_BASE_URL' && value) {
    const result = VALIDATORS.https_url(value);
    if (!result.valid) errors.push(result.error);
  } else if (envVar.name === 'RATE_LIMIT_MAX' || envVar.name === 'RATE_LIMIT_WINDOW_MS' || envVar.name === 'WEBHOOK_TOLERANCE_SEC') {
    if (value) {
      const result = VALIDATORS.positive_integer(value);
      if (!result.valid) errors.push(result.error);
    }
  }
  
  return errors;
}

function cmdAudit() {
  const manifest = loadManifest();
  
  console.log('\n=== ENVIRONMENT VARIABLES AUDIT ===\n');
  
  const groups = {
    'Required at Boot': [],
    'Production Recommended': [],
    'Optional': [],
    'Deprecated': []
  };
  
  manifest.environment_variables.forEach(envVar => {
    if (envVar.deprecated) {
      groups['Deprecated'].push(envVar);
    } else if (envVar.required_at_boot) {
      groups['Required at Boot'].push(envVar);
    } else if (envVar.required_profiles && envVar.required_profiles.includes('production')) {
      groups['Production Recommended'].push(envVar);
    } else {
      groups['Optional'].push(envVar);
    }
  });
  
  Object.entries(groups).forEach(([groupName, vars]) => {
    if (vars.length === 0) return;
    
    console.log(`\n${groupName}:`);
    console.log('─'.repeat(60));
    
    vars.forEach(envVar => {
      console.log(`\n${envVar.name}`);
      console.log(`  Purpose: ${envVar.purpose}`);
      console.log(`  Required: ${envVar.required_at_boot ? 'YES (app crashes if missing)' : 'No'}`);
      
      if (envVar.code_locations) {
        console.log(`  Used in: ${envVar.code_locations.length} location(s)`);
        envVar.code_locations.slice(0, 2).forEach(loc => {
          console.log(`    - ${loc}`);
        });
        if (envVar.code_locations.length > 2) {
          console.log(`    ... and ${envVar.code_locations.length - 2} more`);
        }
      }
      
      if (envVar.deprecated) {
        console.log(`  ⚠️  DEPRECATED: Use ${envVar.replacement} instead`);
      }
    });
  });
  
  console.log('\n\n=== WEBHOOKS AUDIT ===\n');
  
  if (manifest.webhooks) {
    console.log('\nOutbound Webhooks (Platform → CRM):');
    console.log('─'.repeat(60));
    manifest.webhooks.outbound.forEach(webhook => {
      console.log(`\n${webhook.id}`);
      console.log(`  Purpose: ${webhook.purpose}`);
      console.log(`  Endpoint: ${webhook.endpoint_path}`);
      console.log(`  Authentication: HMAC-SHA256 + Bearer token`);
    });
    
    console.log('\n\nInbound Webhooks (CRM → Platform):');
    console.log('─'.repeat(60));
    manifest.webhooks.inbound.forEach(webhook => {
      console.log(`\n${webhook.id}`);
      console.log(`  Purpose: ${webhook.purpose}`);
      console.log(`  Endpoint: ${webhook.endpoint}`);
      console.log(`  Authentication: ${webhook.authentication}`);
    });
  }
  
  console.log('\n');
  process.exit(0);
}

function cmdExplain(key) {
  const manifest = loadManifest();
  
  // Check environment variables
  const envVar = manifest.environment_variables.find(v => v.name === key);
  if (envVar) {
    console.log(`\n=== ${envVar.name} ===\n`);
    console.log(`Purpose: ${envVar.purpose}`);
    console.log(`Required at boot: ${envVar.required_at_boot ? 'YES' : 'No'}`);
    console.log(`Format: ${envVar.format || 'Not specified'}`);
    
    if (envVar.default) {
      console.log(`Default: ${envVar.default}`);
    }
    
    if (envVar.example) {
      console.log(`Example: ${envVar.example}`);
    }
    
    if (envVar.generate_command) {
      console.log(`\nGenerate command:\n  ${envVar.generate_command}`);
    }
    
    console.log(`\nSecurity level: ${envVar.security_level}`);
    
    if (envVar.validation) {
      console.log('\nValidation rules:');
      envVar.validation.forEach(rule => console.log(`  - ${rule}`));
    }
    
    if (envVar.code_locations) {
      console.log('\nCode locations:');
      envVar.code_locations.forEach(loc => console.log(`  - ${loc}`));
    }
    
    if (envVar.deprecated) {
      console.log(`\n⚠️  DEPRECATED`);
      console.log(`Replacement: ${envVar.replacement}`);
      console.log(`Migration: ${envVar.deprecation_notice}`);
    }
    
    console.log('');
    process.exit(0);
  }
  
  // Check webhooks
  if (manifest.webhooks) {
    const outbound = manifest.webhooks.outbound.find(w => w.id === key);
    const inbound = manifest.webhooks.inbound.find(w => w.id === key);
    const webhook = outbound || inbound;
    
    if (webhook) {
      console.log(`\n=== ${webhook.id} ===\n`);
      console.log(`Direction: ${webhook.direction}`);
      console.log(`Purpose: ${webhook.purpose}`);
      console.log(`Endpoint: ${webhook.endpoint || webhook.endpoint_path}`);
      console.log(`Authentication: ${Array.isArray(webhook.authentication) ? webhook.authentication.join(', ') : webhook.authentication}`);
      
      if (webhook.code_locations) {
        console.log('\nCode locations:');
        webhook.code_locations.forEach(loc => console.log(`  - ${loc}`));
      }
      
      console.log('');
      process.exit(0);
    }
  }
  
  console.error(`\nError: Key or webhook "${key}" not found in manifest\n`);
  process.exit(1);
}

function cmdDryRun(sourceFile, targetFile) {
  const manifest = loadManifest();
  const source = loadEnvFile(sourceFile);
  const target = targetFile ? loadEnvFile(targetFile) : {};
  
  console.log('\n=== DRY RUN: Secret Replacement Preview ===\n');
  console.log(`Source: ${sourceFile}`);
  console.log(`Target: ${targetFile || '(new file)'}\n`);
  
  const changes = [];
  const missing = [];
  const invalid = [];
  
  // Check all required variables
  manifest.environment_variables.forEach(envVar => {
    if (envVar.required_at_boot) {
      if (!source[envVar.name]) {
        missing.push(envVar.name);
      }
    }
    
    if (source[envVar.name]) {
      const errors = validateValue(envVar, source[envVar.name]);
      if (errors.length > 0) {
        invalid.push({ name: envVar.name, errors });
      }
      
      const oldVal = target[envVar.name];
      const newVal = source[envVar.name];
      
      if (oldVal !== newVal) {
        changes.push({
          name: envVar.name,
          old: oldVal,
          new: newVal
        });
      }
    }
  });
  
  // Report validation errors
  if (invalid.length > 0) {
    console.log('❌ VALIDATION ERRORS:\n');
    invalid.forEach(({ name, errors }) => {
      console.log(`${name}:`);
      errors.forEach(err => console.log(`  - ${err}`));
      console.log('');
    });
  }
  
  // Report missing required keys
  if (missing.length > 0) {
    console.log('❌ MISSING REQUIRED KEYS:\n');
    missing.forEach(key => console.log(`  - ${key}`));
    console.log('');
  }
  
  // Report changes
  if (changes.length > 0) {
    console.log('📝 CHANGES TO BE APPLIED:\n');
    changes.forEach(({ name, old, new: newVal }) => {
      console.log(`${name}:`);
      console.log(`  Old: ${maskValue(old)}`);
      console.log(`  New: ${maskValue(newVal)}`);
      console.log('');
    });
    
    console.log(`Total changes: ${changes.length}\n`);
  } else {
    console.log('✅ No changes needed - source matches target\n');
  }
  
  if (invalid.length > 0 || missing.length > 0) {
    console.log('❌ Cannot proceed - fix validation errors and missing keys\n');
    process.exit(1);
  }
  
  if (changes.length > 0) {
    console.log('✅ Validation passed - ready to apply\n');
    process.exit(2); // Exit code 2 = differences detected
  }
  
  process.exit(0);
}

function cmdApply(sourceFile, targetFile, createBackup = false) {
  const manifest = loadManifest();
  const source = loadEnvFile(sourceFile);
  const target = fs.existsSync(targetFile) ? loadEnvFile(targetFile) : {};
  
  console.log('\n=== APPLYING SECRET REPLACEMENT ===\n');
  
  // Validate first
  const missing = [];
  const invalid = [];
  
  manifest.environment_variables.forEach(envVar => {
    if (envVar.required_at_boot && !source[envVar.name]) {
      missing.push(envVar.name);
    }
    
    if (source[envVar.name]) {
      const errors = validateValue(envVar, source[envVar.name]);
      if (errors.length > 0) {
        invalid.push({ name: envVar.name, errors });
      }
    }
  });
  
  if (invalid.length > 0 || missing.length > 0) {
    if (invalid.length > 0) {
      console.error('❌ VALIDATION ERRORS:');
      invalid.forEach(({ name, errors }) => {
        console.error(`${name}: ${errors.join(', ')}`);
      });
    }
    if (missing.length > 0) {
      console.error('❌ MISSING REQUIRED KEYS:', missing.join(', '));
    }
    console.error('');
    process.exit(1);
  }
  
  // Create backup if requested
  if (createBackup && fs.existsSync(targetFile)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${targetFile}.backup.${timestamp}`;
    fs.copyFileSync(targetFile, backupPath);
    console.log(`✅ Backup created: ${backupPath}`);
  }
  
  // Merge: preserve unknown keys from target, update from source
  const merged = { ...target };
  
  // Update known keys from source
  manifest.environment_variables.forEach(envVar => {
    if (source[envVar.name] !== undefined) {
      merged[envVar.name] = source[envVar.name];
    }
  });
  
  // Write atomically
  const lines = [];
  lines.push('# Environment Variables for Trading Platform');
  lines.push('# Generated by secrets-replacer CLI');
  lines.push(`# Timestamp: ${new Date().toISOString()}`);
  lines.push('');
  
  Object.keys(merged).sort().forEach(key => {
    lines.push(`${key}=${merged[key]}`);
  });
  
  const content = lines.join('\n') + '\n';
  const tempFile = `${targetFile}.tmp`;
  
  try {
    fs.writeFileSync(tempFile, content, { mode: 0o600 });
    fs.renameSync(tempFile, targetFile);
    console.log(`✅ Successfully wrote to: ${targetFile}`);
    console.log(`   Total keys: ${Object.keys(merged).length}\n`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error writing file: ${error.message}\n`);
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    process.exit(1);
  }
}

// Parse command line
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log(`
Usage:
  secret-replacer audit
  secret-replacer explain <KEY|WEBHOOK_ID>
  secret-replacer dry-run --from <source> --target <target>
  secret-replacer apply --from <source> --target <target> [--backup]
  `);
  process.exit(1);
}

if (command === 'audit') {
  cmdAudit();
} else if (command === 'explain') {
  const key = args[1];
  if (!key) {
    console.error('\nError: explain command requires a key name\n');
    process.exit(1);
  }
  cmdExplain(key);
} else if (command === 'dry-run') {
  const fromIdx = args.indexOf('--from');
  const targetIdx = args.indexOf('--target');
  
  if (fromIdx === -1 || targetIdx === -1) {
    console.error('\nError: dry-run requires --from and --target arguments\n');
    process.exit(1);
  }
  
  const sourceFile = args[fromIdx + 1];
  const targetFile = args[targetIdx + 1];
  
  if (!sourceFile || !targetFile) {
    console.error('\nError: --from and --target must have file paths\n');
    process.exit(1);
  }
  
  cmdDryRun(sourceFile, targetFile);
} else if (command === 'apply') {
  const fromIdx = args.indexOf('--from');
  const targetIdx = args.indexOf('--target');
  const backup = args.includes('--backup');
  
  if (fromIdx === -1 || targetIdx === -1) {
    console.error('\nError: apply requires --from and --target arguments\n');
    process.exit(1);
  }
  
  const sourceFile = args[fromIdx + 1];
  const targetFile = args[targetIdx + 1];
  
  if (!sourceFile || !targetFile) {
    console.error('\nError: --from and --target must have file paths\n');
    process.exit(1);
  }
  
  cmdApply(sourceFile, targetFile, backup);
} else {
  console.error(`\nError: Unknown command "${command}"\n`);
  process.exit(1);
}
