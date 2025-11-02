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

## Support

For deployment issues:
- Check logs first (application + Caddy)
- Review [main README](../../README.md) for configuration reference
- Verify all environment variables are set correctly
- Test /health endpoint for application status

---

**Ready to deploy?** Follow Quick Start steps above. All configuration is environment-agnostic - no provider-specific commands required.
