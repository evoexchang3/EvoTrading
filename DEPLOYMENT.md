# Trading Platform - Production Deployment Guide

## Ubuntu 24.04 LTS Self-Hosting Guide

This guide covers deploying the Trading Platform on **Ubuntu 24.04 LTS** with an external **Neon PostgreSQL** database.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Manual Installation](#manual-installation)
4. [Configuration](#configuration)
5. [SSL/TLS Setup](#ssltls-setup)
6. [Database Management](#database-management)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)
9. [Security Best Practices](#security-best-practices)

---

## Prerequisites

### System Requirements

- **Operating System**: Ubuntu 24.04 LTS (64-bit)
- **RAM**: Minimum 2GB, Recommended 4GB+
- **CPU**: Minimum 2 cores, Recommended 4+ cores
- **Disk Space**: Minimum 20GB, Recommended 50GB+
- **Network**: Static IP address or domain name

### Required Services

- **Database**: Neon PostgreSQL (external, managed)
- **Node.js**: Version 20.x LTS
- **Nginx**: Latest stable (reverse proxy)
- **Certbot**: For SSL/TLS certificates

### Domain & DNS

- Registered domain name (e.g., `trading.yourdomain.com`)
- DNS A record pointing to your server's IP address
- (Optional) DNS AAAA record for IPv6

---

## Quick Start

### Automated Installation

The fastest way to deploy is using the automated installation script:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/trading-platform.git
cd trading-platform

# 2. Run the installation script
sudo bash deployment/scripts/install.sh
```

The script will:
- ✅ Install all dependencies (Node.js, Nginx, PostgreSQL client)
- ✅ Create system user and directories
- ✅ Build the application
- ✅ Configure systemd service
- ✅ Set up Nginx reverse proxy
- ✅ Configure firewall

**Note**: You'll be prompted to configure environment variables and SSL certificates manually.

---

## Manual Installation

### Step 1: System Preparation

Update your system and install required packages:

```bash
sudo apt update && sudo apt upgrade -y

sudo apt install -y \
    curl \
    git \
    nginx \
    postgresql-client \
    build-essential \
    certbot \
    python3-certbot-nginx
```

### Step 2: Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Step 3: Create Application User

```bash
sudo useradd -r -s /bin/bash -d /var/www/trading-platform -m tradingapp
```

### Step 4: Clone & Build Application

```bash
# Clone repository
sudo git clone https://github.com/yourusername/trading-platform.git /var/www/trading-platform
cd /var/www/trading-platform

# Set ownership
sudo chown -R tradingapp:tradingapp /var/www/trading-platform

# Install dependencies
sudo -u tradingapp npm install --production

# Build application
sudo -u tradingapp npm run build
```

### Step 5: Configure Environment

```bash
# Copy production environment template
sudo cp .env.production.example .env

# Edit environment variables
sudo nano .env
```

**Required Configuration** (see [Configuration](#configuration) section for details):

```bash
DATABASE_URL=postgresql://user:pass@your-neon-host.neon.tech/dbname?sslmode=require
JWT_ACCESS_SECRET=<generate-secure-32-byte-hex>
JWT_REFRESH_SECRET=<generate-secure-32-byte-hex>
WEBHOOK_SECRET=<generate-secure-32-byte-hex>
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Set secure permissions:
```bash
sudo chown tradingapp:tradingapp /var/www/trading-platform/.env
sudo chmod 600 /var/www/trading-platform/.env
```

### Step 6: Install Systemd Service

```bash
# Copy service file
sudo cp deployment/systemd/trading-platform.service /etc/systemd/system/

# Reload systemd
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable trading-platform

# Start service
sudo systemctl start trading-platform

# Check status
sudo systemctl status trading-platform
```

### Step 7: Configure Nginx

```bash
# Copy Nginx configuration
sudo cp deployment/nginx/trading-platform.conf /etc/nginx/sites-available/trading-platform

# Edit configuration (replace YOUR_DOMAIN.com)
sudo nano /etc/nginx/sites-available/trading-platform

# Enable site
sudo ln -s /etc/nginx/sites-available/trading-platform /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 8: Configure Firewall

```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

---

## Configuration

### Environment Variables

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens (32 bytes hex) | Generate with crypto |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens (32 bytes hex) | Generate with crypto |
| `WEBHOOK_SECRET` | Secret for signing CRM webhooks (32 bytes hex) | Generate with crypto |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed origins | `https://yourdomain.com` |

#### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Application port (Nginx proxies to this) | `5000` |
| `NODE_ENV` | Environment mode | `production` |
| `LOG_FORMAT` | Log format (`json` recommended) | Plain text |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` (15 min) |
| `TWELVEDATA_API_KEY` | Market data API key | Not set |
| `MARKETAUX_API_KEY` | News API key | Not set |
| `EODHD_API_KEY` | Economic calendar API key | Not set |
| `CRM_BASE_URL` | CRM system base URL | Not set |
| `CRM_SERVICE_TOKEN` | CRM service authentication token | Not set |

### Generating Secure Secrets

```bash
# Generate a single secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate all required secrets
echo "JWT_ACCESS_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
echo "JWT_REFRESH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
echo "WEBHOOK_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
```

---

## SSL/TLS Setup

### Using Let's Encrypt (Recommended)

```bash
# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

**Certificates will auto-renew** via systemd timer. Verify with:
```bash
sudo systemctl status certbot.timer
```

### Using Custom Certificate

If you have your own SSL certificate:

```bash
# Copy certificate files
sudo cp fullchain.pem /etc/ssl/certs/trading-platform.crt
sudo cp privkey.pem /etc/ssl/private/trading-platform.key

# Update Nginx configuration
sudo nano /etc/nginx/sites-available/trading-platform
```

Update these lines:
```nginx
ssl_certificate /etc/ssl/certs/trading-platform.crt;
ssl_certificate_key /etc/ssl/private/trading-platform.key;
```

Reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Database Management

### Database Migrations

The application uses Drizzle ORM for database schema management.

#### Initial Setup

```bash
cd /var/www/trading-platform

# Push schema to database
sudo -u tradingapp npm run db:push
```

#### Generating Migrations

When you modify the database schema:

```bash
# Generate migration from schema changes
npm run db:generate

# Review generated migration in drizzle/migrations/

# Apply migration
npm run db:migrate
```

### Database Backups

#### Automated Backups

Set up daily backups using cron:

```bash
# Edit crontab
sudo crontab -e

# Add daily backup at 2 AM
0 2 * * * /var/www/trading-platform/deployment/scripts/backup.sh
```

#### Manual Backup

```bash
# Run backup script
sudo /var/www/trading-platform/deployment/scripts/backup.sh
```

Backups are stored in `/var/backups/trading-platform/`:
- **Application**: `/var/backups/trading-platform/app/app-TIMESTAMP.tar.gz`
- **Database**: `/var/backups/trading-platform/db/db-TIMESTAMP.sql.gz`

#### Restore from Backup

**Application Restore:**
```bash
sudo systemctl stop trading-platform
sudo tar -xzf /var/backups/trading-platform/app/app-TIMESTAMP.tar.gz -C /var/www/trading-platform
sudo systemctl start trading-platform
```

**Database Restore:**
```bash
# Extract and load database backup
gunzip < /var/backups/trading-platform/db/db-TIMESTAMP.sql.gz | \
PGPASSWORD=your_password psql -h your-neon-host.neon.tech -U your_user -d your_database
```

---

## Monitoring & Maintenance

### Service Management

```bash
# Start service
sudo systemctl start trading-platform

# Stop service
sudo systemctl stop trading-platform

# Restart service
sudo systemctl restart trading-platform

# Check status
sudo systemctl status trading-platform

# Enable auto-start on boot
sudo systemctl enable trading-platform

# Disable auto-start on boot
sudo systemctl disable trading-platform
```

### Viewing Logs

**Application Logs** (systemd journal):
```bash
# Real-time logs
sudo journalctl -u trading-platform -f

# Last 100 lines
sudo journalctl -u trading-platform -n 100

# Logs from last hour
sudo journalctl -u trading-platform --since "1 hour ago"

# Logs with specific error level
sudo journalctl -u trading-platform -p err
```

**Nginx Logs**:
```bash
# Access logs
sudo tail -f /var/log/nginx/trading-platform-access.log

# Error logs
sudo tail -f /var/log/nginx/trading-platform-error.log
```

### Health Checks

```bash
# Check application health
curl http://localhost:5000/api/health

# Check via HTTPS
curl https://yourdomain.com/api/health

# Check with detailed output
curl -v https://yourdomain.com/api/health
```

### Updating the Application

Use the automated update script:

```bash
sudo /var/www/trading-platform/deployment/scripts/update.sh
```

The script will:
1. Create automatic backup
2. Pull latest code
3. Install dependencies
4. Build application
5. Restart service
6. Verify health

### System Resource Monitoring

```bash
# CPU and memory usage
htop

# Disk usage
df -h

# Application process info
ps aux | grep node

# Network connections
sudo netstat -tlnp | grep node
```

---

## Troubleshooting

### Application Won't Start

**Check logs:**
```bash
sudo journalctl -u trading-platform -n 100 --no-pager
```

**Common issues:**

1. **Port already in use**:
   ```bash
   sudo lsof -i :5000
   # Kill process if needed
   sudo kill -9 <PID>
   ```

2. **Missing environment variables**:
   ```bash
   sudo -u tradingapp cat /var/www/trading-platform/.env
   # Verify all required variables are set
   ```

3. **Database connection failed**:
   ```bash
   # Test database connection
   psql "$(grep DATABASE_URL /var/www/trading-platform/.env | cut -d '=' -f2-)"
   ```

### Nginx 502 Bad Gateway

**Check if application is running:**
```bash
sudo systemctl status trading-platform
curl http://localhost:5000/api/health
```

**Check Nginx error logs:**
```bash
sudo tail -f /var/log/nginx/trading-platform-error.log
```

**Verify Nginx configuration:**
```bash
sudo nginx -t
```

### SSL Certificate Issues

**Check certificate expiration:**
```bash
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

**Renew certificate manually:**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### High Memory Usage

**Check Node.js process:**
```bash
ps aux | grep node
top -p $(pgrep -f "node.*trading-platform")
```

**Restart service to free memory:**
```bash
sudo systemctl restart trading-platform
```

### Database Performance Issues

**Check active connections:**
```bash
# From your Neon dashboard or using psql:
SELECT count(*) FROM pg_stat_activity;
```

**Optimize queries** by reviewing slow query logs in your application logs.

---

## Security Best Practices

### 1. Keep System Updated

```bash
# Enable automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 2. Secure SSH Access

```bash
# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no

# Use SSH keys instead of passwords
# Disable password authentication
# Set: PasswordAuthentication no

# Restart SSH
sudo systemctl restart sshd
```

### 3. Configure Fail2Ban

```bash
# Install Fail2Ban
sudo apt install fail2ban

# Configure Nginx jail
sudo nano /etc/fail2ban/jail.local
```

Add:
```ini
[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/trading-platform-error.log

[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/log/nginx/trading-platform-access.log
```

Restart:
```bash
sudo systemctl restart fail2ban
```

### 4. Regular Security Audits

```bash
# Check for security updates
sudo apt update
sudo apt list --upgradable

# Review open ports
sudo ss -tlnp

# Check failed login attempts
sudo journalctl -u ssh | grep "Failed password"
```

### 5. Rotate Secrets Regularly

Update JWT secrets every 90 days:

```bash
# Generate new secrets
echo "New secrets:"
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Update .env file
sudo nano /var/www/trading-platform/.env

# Restart application
sudo systemctl restart trading-platform
```

---

## Additional Resources

### Useful Commands Reference

```bash
# Check application status
sudo systemctl status trading-platform

# View real-time logs
sudo journalctl -u trading-platform -f

# Test health endpoint
curl http://localhost:5000/api/health

# Restart after config changes
sudo systemctl restart trading-platform
sudo systemctl reload nginx

# Check disk space
df -h /var/www/trading-platform

# Check memory usage
free -h

# Check network connectivity
ping -c 4 google.com
```

### File Locations

- **Application**: `/var/www/trading-platform/`
- **Environment Config**: `/var/www/trading-platform/.env`
- **Systemd Service**: `/etc/systemd/system/trading-platform.service`
- **Nginx Config**: `/etc/nginx/sites-available/trading-platform`
- **SSL Certificates**: `/etc/letsencrypt/live/yourdomain.com/`
- **Backups**: `/var/backups/trading-platform/`
- **Logs**: `journalctl -u trading-platform` or `/var/www/trading-platform/logs/`

### Getting Help

- **GitHub Issues**: https://github.com/yourusername/trading-platform/issues
- **Documentation**: Check README.md and inline code comments
- **Community**: Join our Discord/Slack community

---

## License

This deployment guide is part of the Trading Platform project.
See LICENSE file for details.
