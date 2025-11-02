# Secrets/Webhooks Replacer CLI

A secure command-line tool for auditing, validating, and rotating environment variables and webhook configurations. **Never prints actual secret values** - only masked versions for security.

## Features

- **Audit**: List all environment variables with purpose and code locations
- **Explain**: Show detailed information about a specific variable
- **Dry-run**: Preview secret replacements with validation (masked output)
- **Apply**: Atomic secret replacement with automatic backups

## Usage

### Audit All Variables

Lists all environment variables with their purpose, required status, and code locations:

```bash
node tools/secret-replacer/index.cjs audit
```

**Output includes:**
- Required at boot variables (app crashes if missing)
- Production recommended variables
- Optional variables
- Deprecated variables with migration paths
- Webhook inventory

### Explain a Variable

Shows complete details about a specific environment variable or webhook:

```bash
node tools/secret-replacer/index.js explain DATABASE_URL
node tools/secret-replacer/index.js explain WEBHOOK_SECRET
node tools/secret-replacer/index.js explain deposit.completed
```

**Output includes:**
- Purpose and format
- Default values
- Generation commands
- Validation rules
- Code locations
- Security level

### Dry-Run (Preview Changes)

Preview what would change without modifying files. Shows masked values for security:

```bash
node tools/secret-replacer/index.js dry-run \
  --from .env.new \
  --target .env
```

**Performs:**
- Format validation (HTTPS for URLs, 64-hex for secrets, etc.)
- Required variable checks
- Diff analysis (shows old → new with masked values)

**Exit codes:**
- `0` - No changes needed
- `2` - Differences detected (ready to apply)
- `1` - Validation errors or missing required keys

### Apply Changes

Atomically replace secrets with automatic backup:

```bash
node tools/secret-replacer/index.js apply \
  --from .env.new \
  --target .env \
  --backup
```

**Features:**
- Creates timestamped backup before changes
- Preserves unknown keys in target file
- Atomic write (temp file + rename)
- Sets restrictive permissions (600)
- Validates all secrets before writing

## Validation Rules

The CLI enforces security best practices:

| Variable Type | Validation |
|--------------|------------|
| `DATABASE_URL` | Must start with `postgresql://` or `postgres://`, include `?sslmode=require` |
| `WEBHOOK_SECRET` | Must be exactly 64 hexadecimal characters |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Minimum 32 hexadecimal characters |
| `CRM_BASE_URL` | Must use HTTPS protocol |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS` | Must be positive integers |

## Security

- **Never logs or prints actual secret values**
- Masked output format: `a1b2...c3d4` (shows first/last 4 chars only)
- Creates backups with timestamps for audit trail
- Validates formats before writing
- Prevents accidental secret exposure

## Examples

### Complete Rotation Workflow

```bash
# 1. Audit current configuration
node tools/secret-replacer/index.cjs audit

# 2. Explain specific variable
node tools/secret-replacer/index.js explain JWT_ACCESS_SECRET

# 3. Preview rotation from staging to production
node tools/secret-replacer/index.js dry-run \
  --from .env.staging \
  --target .env.production

# 4. Apply with backup
node tools/secret-replacer/index.js apply \
  --from .env.staging \
  --target .env.production \
  --backup
```

### CI/CD Integration

In CI pipelines, use `audit` and `dry-run` only (never `apply`):

```yaml
- name: Audit secrets
  run: node tools/secret-replacer/index.cjs audit

- name: Validate format
  run: node tools/secret-replacer/index.js dry-run --from .env.sample --target .env.example
```

## Exit Codes

- `0` - Success (no errors)
- `1` - Error (validation failure, missing required keys, file I/O error)
- `2` - Differences detected in dry-run mode (not an error - indicates changes would be made)

## Reference

See `secrets-manifest.yml` in the repository root for complete documentation of all environment variables including:
- Purpose and security level
- Required status for each deployment profile
- Code locations and usage
- Rotation schedules
- Webhook integration details
