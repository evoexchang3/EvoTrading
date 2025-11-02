# Self-Host Deployment Guide

Provider-agnostic deployment instructions for running the Trading Platform on your own infrastructure.

## Overview

This directory contains everything needed to deploy the Trading Platform on:
- Ubuntu 24.04 LTS servers
- Any Docker-capable host
- Cloud VMs (AWS EC2, DigitalOcean Droplets, Linode, etc.)
- Dedicated servers

## Architecture

```
Internet → Caddy (HTTPS/TLS) → Trading Platform Container → External Neon Database
           Port 80/443         Port 5000 (localhost)         (via DATABASE_URL)
```

**Key Components:**
- **Caddy**: Automatic HTTPS, reverse proxy, WebSocket support
- **Docker Container**: Trading platform application
- **External Database**: Neon PostgreSQL (no local database needed)

## Files in This Directory

| File | Purpose |
|------|---------|
| `docker-compose.prod.yml` | Container orchestration for production |
| `Caddyfile` | Reverse proxy configuration with automatic HTTPS |
| `README-SELF-HOST.md` | This deployment guide |

## Prerequisites

### Required
1. **Docker** 24.0+ and Docker Compose v2
2. **Domain name** pointing to your server IP (A record)
3. **Firewall** with ports 80, 443 open
4. **Environment variables** (see Configuration section)

### Recommended
- 2 CPU cores minimum
- 2GB RAM minimum  
- 20GB storage minimum
- Ubuntu 24.04 LTS (other Linux distros work with adjustments)

## Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd trading-platform
```

### 2. Configure Environment Variables

Create `.env` file from template:
```bash
cp .env.example .env
```

Fill in all required values (see Configuration section below).

### 3. Pull Container Image
```bash
docker pull ghcr.io/<OWNER>/<REPO>:latest
```

Replace `<OWNER>/<REPO>` with your GitHub repository path.

### 4. Start Application
```bash
docker-compose -f infra/self-host/docker-compose.prod.yml up -d
```

Verify health:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 42.5
}
```

### 5. Configure Reverse Proxy (Caddy)

Edit `infra/self-host/Caddyfile`:
- Replace `<YOUR_DOMAIN>` with your actual domain
- Adjust security headers if needed

Install and run Caddy:
```bash
# Ubuntu/Debian
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Copy Caddyfile
sudo cp infra/self-host/Caddyfile /etc/caddy/Caddyfile

# Start Caddy
sudo systemctl enable caddy
sudo systemctl start caddy
```

### 6. Verify Deployment

Visit `https://<YOUR_DOMAIN>` - should show trading platform.

Check logs:
```bash
# Application logs
docker-compose -f infra/self-host/docker-compose.prod.yml logs -f

# Caddy logs
sudo journalctl -u caddy -f
```

## Configuration

### Environment Variables

Create `.env` file in repository root with these values:

#### Required

```bash
# Database (request from CRM administrator)
DATABASE_URL=<YOUR_DATABASE_CONNECTION_STRING>

# Authentication (generate yourself)
JWT_ACCESS_SECRET=<GENERATE_64_CHAR_HEX>
JWT_REFRESH_SECRET=<GENERATE_64_CHAR_HEX>

# CRM Integration (request from CRM administrator)
WEBHOOK_SECRET=<GENERATE_64_CHAR_HEX>
CRM_BASE_URL=<CRM_API_BASE_URL>
CRM_SERVICE_TOKEN=<GENERATE_64_CHAR_HEX>

# Server Configuration
NODE_ENV=production
PORT=5000
LOG_FORMAT=json
```

#### Optional (Recommended for Production)

```bash
# Security
CORS_ALLOWED_ORIGINS=https://your-domain.com
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000

# Market Data (get API keys from providers)
TWELVEDATA_API_KEY=<YOUR_API_KEY>
MARKETAUX_API_KEY=<YOUR_API_KEY>
EODHD_API_KEY=<YOUR_API_KEY>
```

### Placeholder Mapping

| Placeholder | Source | Example |
|-------------|--------|---------|
| `<YOUR_DOMAIN>` | Your DNS provider | `trading.example.com` |
| `<YOUR_DATABASE_CONNECTION_STRING>` | CRM administrator | `postgresql://user:pass@host/db` |
| `<GENERATE_64_CHAR_HEX>` | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` | `a1b2c3d4e5f6...` |
| `<CRM_API_BASE_URL>` | CRM administrator | `https://crm.example.com/api` |
| `<YOUR_API_KEY>` | API provider dashboard | Provider-specific format |

## Operations

### Updating

```bash
# Pull latest image
docker pull ghcr.io/<OWNER>/<REPO>:latest

# Restart containers
docker-compose -f infra/self-host/docker-compose.prod.yml up -d
```

### Monitoring

```bash
# Container status
docker-compose -f infra/self-host/docker-compose.prod.yml ps

# Resource usage
docker stats trading-platform

# Health check
curl http://localhost:5000/health
```

### Backups

**Database**: Neon handles backups automatically (Point-in-Time Recovery available)

**Environment Configuration**:
```bash
# Backup .env securely (encrypted!)
tar -czf env-backup-$(date +%Y%m%d).tar.gz .env
gpg -c env-backup-$(date +%Y%m%d).tar.gz
rm env-backup-$(date +%Y%m%d).tar.gz
```

### Logs

```bash
# Application logs
docker-compose -f infra/self-host/docker-compose.prod.yml logs -f trading-platform

# Last 100 lines
docker-compose -f infra/self-host/docker-compose.prod.yml logs --tail=100

# Caddy logs
sudo tail -f /var/log/caddy/trading-platform-access.log
```

### Troubleshooting

#### Container won't start
```bash
# Check logs
docker-compose -f infra/self-host/docker-compose.prod.yml logs

# Verify environment variables
docker-compose -f infra/self-host/docker-compose.prod.yml config

# Check health
docker inspect trading-platform | grep -A 5 Health
```

#### Database connection fails
- Verify `DATABASE_URL` format includes `?sslmode=require`
- Check network connectivity to Neon
- Confirm credentials are correct

#### HTTPS not working
- Verify DNS A record points to server IP
- Ensure ports 80, 443 open in firewall
- Check Caddy logs: `sudo journalctl -u caddy`
- Confirm domain in Caddyfile matches DNS

## Security Checklist

- [ ] All secrets in `.env` file (not hardcoded)
- [ ] `.env` file has restrictive permissions (600)
- [ ] Firewall configured (only 80, 443, 22 open)
- [ ] SSH key authentication (password auth disabled)
- [ ] Regular security updates: `sudo apt update && sudo apt upgrade`
- [ ] CORS configured for production domain only
- [ ] Rate limiting enabled
- [ ] Monitoring and alerting configured

## Scaling

### Vertical Scaling
Increase resources in `docker-compose.prod.yml`:
```yaml
deploy:
  resources:
    limits:
      cpus: '4.0'      # Increase CPU
      memory: 4G       # Increase RAM
```

### Horizontal Scaling
For multiple instances, use:
- Load balancer (nginx, HAProxy)
- Sticky sessions for WebSocket
- Shared session store (Redis)

## Site Customization

The Trading Platform supports runtime customization of branding, layout, and features without code changes.

### Configuration File

All customization is controlled by `site-config.yml` in the repository root.

**Key Configuration Options:**
- **Branding**: Company name, support email, logo path
- **Layout Variants**: 15 pre-built visual themes (bloomberg-dark, crypto-neon, modern-light, etc.)
- **Feature Toggles**: Enable/disable account types and payment methods
- **Localization**: Default language and available languages

### Customization Methods

#### Method 1: Edit Config File Directly

```bash
# Edit site-config.yml
nano site-config.yml

# Example changes:
# - Update branding.companyName: "My Trading Company"
# - Update branding.supportEmail: "support@mycompany.com"
# - Change layout.activeVariant: "crypto-neon"
# - Disable features.accountTypes.vip.enabled: false

# No restart required - refresh browser to see changes
```

#### Method 2: Use CLI Tool

The platform includes a command-line tool for safe configuration management:

```bash
# View current configuration
node tools/site-customizer/index.cjs audit

# Update company name
node tools/site-customizer/index.cjs update branding.companyName "My Trading Co"

# Update support email
node tools/site-customizer/index.cjs update branding.supportEmail "support@example.com"

# Preview all available layout variants
node tools/site-customizer/index.cjs layout preview

# Change layout variant
node tools/site-customizer/index.cjs layout select crypto-neon

# Disable a payment method
node tools/site-customizer/index.cjs update features.paymentMethods.crypto.enabled false

# Enable VIP account type
node tools/site-customizer/index.cjs update features.accountTypes.vip.visible true
```

**CLI Features:**
- Automatic config validation before saving
- Backup creation on every update
- Masked output for sensitive values
- Exit codes for automation (0=success, 1=error, 2=changes detected)

### Available Layout Variants

| Variant Name | Description |
|--------------|-------------|
| `bloomberg-dark` | Dark charcoal with professional blue accents (default) |
| `modern-light` | Clean white with subtle cool grays and vibrant CTAs |
| `minimalist-corporate` | Ultra-minimal white with navy and gray tones |
| `crypto-neon` | Dark background with neon green/purple crypto aesthetics |
| `financial-times` | Newspaper-inspired with sepia tones and serif headers |
| `nordic-clean` | Light gray with Scandinavian minimalism and blue accents |
| `charcoal-pro` | Deep charcoal with gold accents for premium feel |
| `emerald-trader` | Dark teal background with emerald green highlights |
| `navy-institutional` | Deep navy blue with cream text, institutional look |
| `sunset-trading` | Warm orange/amber gradients with dark backgrounds |
| `midnight-premium` | Near-black with subtle purple and silver accents |
| `arctic-minimal` | Cool blue-grays with ice-blue highlights |
| `carbon-sleek` | Carbon fiber aesthetic with red danger accents |
| `sapphire-finance` | Royal blue with gold details, luxury branding |
| `terracotta-warm` | Warm earth tones with terracotta and cream |

### Docker Customization

#### Option 1: Volume Mount (Recommended)

Mount custom `site-config.yml` as read-only volume in `docker-compose.prod.yml`:

```yaml
services:
  app:
    volumes:
      - ./my-custom-config.yml:/app/site-config.yml:ro
```

#### Option 2: Custom Config Path

Use `SITE_CONFIG_PATH` environment variable:

```yaml
services:
  app:
    environment:
      - SITE_CONFIG_PATH=/app/config/branding.yml
    volumes:
      - ./my-branding.yml:/app/config/branding.yml:ro
```

#### Option 3: Rebuild Image

For permanent customization, edit `site-config.yml` and rebuild:

```bash
# Edit config
nano site-config.yml

# Rebuild image
docker build -t my-trading-platform:custom .

# Update docker-compose.prod.yml image reference
# Then restart
docker-compose -f infra/self-host/docker-compose.prod.yml up -d
```

### Feature Toggle Examples

#### Hide Crypto Payments

```bash
node tools/site-customizer/index.cjs update features.paymentMethods.crypto.enabled false
```

Or edit `site-config.yml`:
```yaml
features:
  paymentMethods:
    crypto:
      enabled: false  # Hides entire crypto category
```

#### Show Only Standard and Professional Accounts

```yaml
features:
  accountTypes:
    standard: { enabled: true, visible: true }
    professional: { enabled: true, visible: true }
    vip: { enabled: false, visible: false }  # Hidden
```

#### Disable Specific Payment Sub-Methods

```yaml
features:
  paymentMethods:
    cards:
      enabled: true
      visa: true
      mastercard: true
      debit: false  # Disable debit cards only
```

### Testing Layouts

Preview layouts without changing production config:

```bash
# Preview all variants
node tools/site-customizer/index.cjs layout preview

# Temporarily switch layout
node tools/site-customizer/index.cjs layout select midnight-premium

# Refresh browser at https://yoursite.com to see new theme
# Public pages affected - dashboard remains unchanged

# Switch back
node tools/site-customizer/index.cjs layout select bloomberg-dark
```

**Important Notes:**
- Layout changes apply to **public pages only** (landing, about, contact, etc.)
- **Dashboard pages remain unchanged** regardless of layout selection
- No workflow restart required - refresh browser to see changes
- All layouts are fully responsive and tested across devices

### Branding Best Practices

1. **Company Name**: Keep under 30 characters for mobile nav
2. **Support Email**: Use dedicated support email, not personal
3. **Logo**: 
   - If using custom logo, place in `client/public/assets/logo.png`
   - Set `branding.logo.path: "/assets/logo.png"`
   - Recommended size: 120x40px for nav, 200x80px for footer
4. **Layout Selection**:
   - Choose layout that matches your brand identity
   - Test on multiple devices before production
   - Consider target audience (retail vs institutional)

### Automation Examples

#### Scheduled Layout Rotation

```bash
#!/bin/bash
# Rotate through 3 layouts weekly
WEEK=$(date +%U)
VARIANTS=("bloomberg-dark" "crypto-neon" "modern-light")
VARIANT=${VARIANTS[$((WEEK % 3))]}

node tools/site-customizer/index.cjs layout select "$VARIANT"
```

#### CI/CD Integration

```yaml
# GitHub Actions example
- name: Validate site config
  run: node tools/site-customizer/index.cjs audit

- name: Apply production branding
  run: |
    node tools/site-customizer/index.cjs update branding.companyName "${{ secrets.COMPANY_NAME }}"
    node tools/site-customizer/index.cjs update branding.supportEmail "${{ secrets.SUPPORT_EMAIL }}"
```

## Support

For deployment issues:
- Check logs first (application + Caddy)
- Review [main README](../../README.md) for configuration reference
- Verify all environment variables are set correctly
- Test /health endpoint for application status
- Review `site-config.yml` for branding/layout issues

---

**Ready to deploy?** Follow Quick Start steps above. All configuration is environment-agnostic - no provider-specific commands required.
