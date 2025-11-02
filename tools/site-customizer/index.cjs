#!/usr/bin/env node
// Site Customizer CLI - Runtime configuration management for Trading Platform
// Note: This file uses .cjs extension to run as CommonJS in an ESM project

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Available layout variants
const LAYOUT_VARIANTS = [
  'bloomberg-dark',
  'modern-light',
  'minimalist-corporate',
  'crypto-neon',
  'financial-times',
  'nordic-clean',
  'charcoal-pro',
  'emerald-trader',
  'navy-institutional',
  'sunset-trading',
  'midnight-premium',
  'arctic-minimal',
  'carbon-sleek',
  'sapphire-finance',
  'terracotta-warm'
];

// Utility: Load site-config.yml
function loadConfig(configPath = './site-config.yml') {
  try {
    const fullPath = path.resolve(configPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`${colors.red}✗ Config file not found:${colors.reset} ${fullPath}`);
      process.exit(1);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const config = yaml.load(fileContents);
    return { config, path: fullPath };
  } catch (error) {
    console.error(`${colors.red}✗ Failed to load config:${colors.reset} ${error.message}`);
    process.exit(1);
  }
}

// Utility: Save site-config.yml
function saveConfig(config, configPath, backup = true) {
  try {
    const fullPath = path.resolve(configPath);
    
    // Create backup if requested
    if (backup && fs.existsSync(fullPath)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `${fullPath}.backup-${timestamp}`;
      fs.copyFileSync(fullPath, backupPath);
      console.log(`${colors.dim}📁 Backup created:${colors.reset} ${backupPath}`);
    }
    
    // Write new config with proper formatting
    const yamlStr = yaml.dump(config, {
      indent: 2,
      lineWidth: 100,
      noRefs: true,
      sortKeys: false
    });
    
    fs.writeFileSync(fullPath, yamlStr, 'utf8');
    fs.chmodSync(fullPath, 0o644);
    
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Failed to save config:${colors.reset} ${error.message}`);
    return false;
  }
}

// Utility: Validate configuration structure
function validateConfig(config) {
  const errors = [];
  
  // Required top-level sections
  const requiredSections = ['branding', 'layout', 'features'];
  requiredSections.forEach(section => {
    if (!config[section]) {
      errors.push(`Missing required section: ${section}`);
    }
  });
  
  // Validate branding
  if (config.branding) {
    if (!config.branding.companyName) {
      errors.push('branding.companyName is required');
    }
    if (!config.branding.supportEmail || !config.branding.supportEmail.includes('@')) {
      errors.push('branding.supportEmail must be a valid email address');
    }
  }
  
  // Validate layout
  if (config.layout) {
    const variant = config.layout.activeVariant;
    if (!variant || !LAYOUT_VARIANTS.includes(variant)) {
      errors.push(`layout.activeVariant must be one of: ${LAYOUT_VARIANTS.join(', ')}`);
    }
  }
  
  return errors;
}

// Command: audit
function auditCommand(options = {}) {
  const configPath = options.config || process.env.SITE_CONFIG_PATH || './site-config.yml';
  const { config } = loadConfig(configPath);
  
  console.log(`${colors.bright}${colors.cyan}=== SITE CONFIGURATION AUDIT ===${colors.reset}\n`);
  console.log(`${colors.dim}Config file:${colors.reset} ${path.resolve(configPath)}\n`);
  
  // Branding
  console.log(`${colors.bright}Branding:${colors.reset}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  Company Name:    ${colors.green}${config.branding.companyName}${colors.reset}`);
  console.log(`  Support Email:   ${colors.green}${config.branding.supportEmail}${colors.reset}`);
  console.log(`  Logo Enabled:    ${config.branding.logo.enabled ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
  console.log(`  Logo Path:       ${config.branding.logo.path || colors.dim + '(default icon + text)'}${colors.reset}`);
  console.log();
  
  // Layout
  console.log(`${colors.bright}Layout & Theme:${colors.reset}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  Active Variant:  ${colors.magenta}${config.layout.activeVariant}${colors.reset}`);
  console.log(`  Sticky Header:   ${config.layout.stickyHeader ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
  console.log(`  Show Footer:     ${config.layout.showFooter ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
  console.log(`  Compact Mode:    ${config.layout.compactMode ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
  console.log();
  
  // Account Types
  console.log(`${colors.bright}Account Types:${colors.reset}`);
  console.log(`${'─'.repeat(60)}`);
  const accountTypes = config.features.accountTypes;
  Object.keys(accountTypes).forEach(type => {
    const status = accountTypes[type].enabled && accountTypes[type].visible;
    const icon = status ? colors.green + '✓' : colors.red + '✗';
    console.log(`  ${type.padEnd(15)} ${icon}${colors.reset}`);
  });
  console.log();
  
  // Payment Methods
  console.log(`${colors.bright}Payment Methods:${colors.reset}`);
  console.log(`${'─'.repeat(60)}`);
  const paymentMethods = config.features.paymentMethods;
  Object.keys(paymentMethods).forEach(category => {
    const categoryData = paymentMethods[category];
    const icon = categoryData.enabled ? colors.green + '✓' : colors.red + '✗';
    console.log(`  ${category.padEnd(15)} ${icon}${colors.reset}`);
    
    // Show sub-methods if category is an object with more than just 'enabled'
    if (typeof categoryData === 'object' && Object.keys(categoryData).length > 1) {
      Object.keys(categoryData).forEach(method => {
        if (method !== 'enabled' && typeof categoryData[method] === 'boolean') {
          const methodIcon = categoryData[method] ? colors.dim + '  ├─ ✓' : colors.dim + '  ├─ ✗';
          console.log(`${methodIcon} ${method}${colors.reset}`);
        }
      });
    }
  });
  console.log();
  
  // Localization
  console.log(`${colors.bright}Localization:${colors.reset}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  Default Language: ${colors.green}${config.localization.defaultLanguage}${colors.reset}`);
  console.log(`  Enabled Languages: ${colors.dim}${config.localization.enabledLanguages.join(', ')}${colors.reset}`);
  console.log();
  
  // Validation
  const errors = validateConfig(config);
  if (errors.length > 0) {
    console.log(`${colors.red}${colors.bright}⚠ Validation Errors:${colors.reset}`);
    errors.forEach(err => console.log(`  ${colors.red}✗${colors.reset} ${err}`));
    process.exit(1);
  } else {
    console.log(`${colors.green}✓ Configuration is valid${colors.reset}`);
  }
}

// Command: update
function updateCommand(key, value, options = {}) {
  const configPath = options.config || process.env.SITE_CONFIG_PATH || './site-config.yml';
  const { config, path: fullPath } = loadConfig(configPath);
  
  // Parse nested key path (e.g., "branding.companyName")
  const keyParts = key.split('.');
  let target = config;
  
  // Navigate to the parent object
  for (let i = 0; i < keyParts.length - 1; i++) {
    if (!target[keyParts[i]]) {
      console.error(`${colors.red}✗ Invalid key path:${colors.reset} ${key}`);
      console.error(`${colors.dim}  Section '${keyParts[i]}' does not exist${colors.reset}`);
      process.exit(1);
    }
    target = target[keyParts[i]];
  }
  
  const finalKey = keyParts[keyParts.length - 1];
  const oldValue = target[finalKey];
  
  // Parse value (handle booleans, numbers, strings)
  let parsedValue = value;
  if (value === 'true') parsedValue = true;
  else if (value === 'false') parsedValue = false;
  else if (!isNaN(value) && value.trim() !== '') parsedValue = Number(value);
  
  // Update the value
  target[finalKey] = parsedValue;
  
  // Validate before saving
  const errors = validateConfig(config);
  if (errors.length > 0) {
    console.error(`${colors.red}✗ Update would make config invalid:${colors.reset}`);
    errors.forEach(err => console.error(`  ${colors.red}✗${colors.reset} ${err}`));
    process.exit(1);
  }
  
  // Save
  const backup = !options.noBackup;
  if (saveConfig(config, fullPath, backup)) {
    console.log(`${colors.green}✓ Configuration updated${colors.reset}`);
    console.log(`  ${colors.dim}${key}:${colors.reset}`);
    console.log(`    Old: ${colors.red}${oldValue}${colors.reset}`);
    console.log(`    New: ${colors.green}${parsedValue}${colors.reset}`);
  }
}

// Command: layout select
function layoutSelectCommand(variantName, options = {}) {
  if (!LAYOUT_VARIANTS.includes(variantName)) {
    console.error(`${colors.red}✗ Invalid layout variant:${colors.reset} ${variantName}`);
    console.log(`\n${colors.bright}Available variants:${colors.reset}`);
    LAYOUT_VARIANTS.forEach(v => {
      console.log(`  ${colors.cyan}${v}${colors.reset}`);
    });
    process.exit(1);
  }
  
  const configPath = options.config || process.env.SITE_CONFIG_PATH || './site-config.yml';
  const { config, path: fullPath } = loadConfig(configPath);
  
  const oldVariant = config.layout.activeVariant;
  config.layout.activeVariant = variantName;
  
  const backup = !options.noBackup;
  if (saveConfig(config, fullPath, backup)) {
    console.log(`${colors.green}✓ Layout variant changed${colors.reset}`);
    console.log(`  ${colors.dim}Old:${colors.reset} ${colors.red}${oldVariant}${colors.reset}`);
    console.log(`  ${colors.dim}New:${colors.reset} ${colors.magenta}${variantName}${colors.reset}`);
    console.log(`\n${colors.dim}💡 Refresh your browser to see the changes${colors.reset}`);
  }
}

// Command: layout preview
function layoutPreviewCommand() {
  console.log(`${colors.bright}${colors.cyan}=== AVAILABLE LAYOUT VARIANTS ===${colors.reset}\n`);
  
  const descriptions = {
    'bloomberg-dark': 'Dark charcoal with professional blue accents (default)',
    'modern-light': 'Clean white with subtle cool grays and vibrant CTAs',
    'minimalist-corporate': 'Ultra-minimal white with navy and gray tones',
    'crypto-neon': 'Dark background with neon green/purple crypto aesthetics',
    'financial-times': 'Newspaper-inspired with sepia tones and serif headers',
    'nordic-clean': 'Light gray with Scandinavian minimalism and blue accents',
    'charcoal-pro': 'Deep charcoal with gold accents for premium feel',
    'emerald-trader': 'Dark teal background with emerald green highlights',
    'navy-institutional': 'Deep navy blue with cream text, institutional look',
    'sunset-trading': 'Warm orange/amber gradients with dark backgrounds',
    'midnight-premium': 'Near-black with subtle purple and silver accents',
    'arctic-minimal': 'Cool blue-grays with ice-blue highlights',
    'carbon-sleek': 'Carbon fiber aesthetic with red danger accents',
    'sapphire-finance': 'Royal blue with gold details, luxury branding',
    'terracotta-warm': 'Warm earth tones with terracotta and cream'
  };
  
  LAYOUT_VARIANTS.forEach((variant, index) => {
    const isEven = index % 2 === 0;
    const color = isEven ? colors.cyan : colors.magenta;
    console.log(`${color}${variant.padEnd(25)}${colors.reset} ${colors.dim}${descriptions[variant]}${colors.reset}`);
  });
  
  console.log(`\n${colors.bright}Usage:${colors.reset}`);
  console.log(`  ${colors.dim}node tools/site-customizer/index.cjs layout select ${colors.cyan}<variant-name>${colors.reset}`);
  console.log(`\n${colors.dim}Example:${colors.reset}`);
  console.log(`  ${colors.dim}node tools/site-customizer/index.cjs layout select crypto-neon${colors.reset}`);
}

// Main CLI logic
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
    console.log(`${colors.bright}${colors.cyan}Trading Platform Site Customizer${colors.reset}
    
${colors.bright}USAGE:${colors.reset}
  node tools/site-customizer/index.cjs <command> [options]

${colors.bright}COMMANDS:${colors.reset}
  ${colors.green}audit${colors.reset}                         Show current configuration
  ${colors.green}update${colors.reset} <key> <value>          Update a configuration value
  ${colors.green}layout select${colors.reset} <variant>       Change active layout variant
  ${colors.green}layout preview${colors.reset}                List all available layout variants

${colors.bright}OPTIONS:${colors.reset}
  --config <path>                Custom config file path (default: ./site-config.yml)
  --no-backup                    Skip backup creation when updating

${colors.bright}EXAMPLES:${colors.reset}
  ${colors.dim}# View current configuration${colors.reset}
  node tools/site-customizer/index.cjs audit

  ${colors.dim}# Update company name${colors.reset}
  node tools/site-customizer/index.cjs update branding.companyName "My Trading Co"

  ${colors.dim}# Update support email${colors.reset}
  node tools/site-customizer/index.cjs update branding.supportEmail "support@mycompany.com"

  ${colors.dim}# Enable/disable account type${colors.reset}
  node tools/site-customizer/index.cjs update features.accountTypes.vip.enabled false

  ${colors.dim}# Enable/disable payment method${colors.reset}
  node tools/site-customizer/index.cjs update features.paymentMethods.crypto.enabled true

  ${colors.dim}# Preview all layout variants${colors.reset}
  node tools/site-customizer/index.cjs layout preview

  ${colors.dim}# Change layout variant${colors.reset}
  node tools/site-customizer/index.cjs layout select crypto-neon

  ${colors.dim}# Use custom config file${colors.reset}
  node tools/site-customizer/index.cjs audit --config /path/to/config.yml

${colors.bright}ENVIRONMENT VARIABLES:${colors.reset}
  SITE_CONFIG_PATH               Default config file path
`);
    return;
  }
  
  const command = args[0];
  const options = {};
  
  // Parse options
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--config' && args[i + 1]) {
      options.config = args[i + 1];
      i++;
    } else if (args[i] === '--no-backup') {
      options.noBackup = true;
    }
  }
  
  // Execute command
  try {
    if (command === 'audit') {
      auditCommand(options);
    } else if (command === 'update') {
      if (args.length < 3) {
        console.error(`${colors.red}✗ Missing arguments${colors.reset}`);
        console.error(`Usage: update <key> <value>`);
        process.exit(1);
      }
      const key = args[1];
      const value = args[2];
      updateCommand(key, value, options);
    } else if (command === 'layout' && args[1] === 'select') {
      if (args.length < 3) {
        console.error(`${colors.red}✗ Missing variant name${colors.reset}`);
        console.error(`Usage: layout select <variant-name>`);
        process.exit(1);
      }
      layoutSelectCommand(args[2], options);
    } else if (command === 'layout' && args[1] === 'preview') {
      layoutPreviewCommand();
    } else {
      console.error(`${colors.red}✗ Unknown command:${colors.reset} ${command}`);
      console.error(`Run 'node tools/site-customizer/index.cjs help' for usage information`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`${colors.red}✗ Error:${colors.reset} ${error.message}`);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run CLI
if (require.main === module) {
  main();
}

module.exports = { loadConfig, saveConfig, validateConfig, LAYOUT_VARIANTS };
