#!/bin/bash

# ============================================
# Trading Platform - Ubuntu 24.04 LTS Installation Script
# ============================================
# This script automates the deployment of the trading platform
# Run as root or with sudo

set -e  # Exit on any error

echo "============================================"
echo "Trading Platform - Installation Script"
echo "Ubuntu 24.04 LTS"
echo "============================================"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "ERROR: This script must be run as root (use sudo)" 
   exit 1
fi

# Configuration
APP_NAME="trading-platform"
APP_USER="tradingapp"
APP_DIR="/var/www/${APP_NAME}"
NODE_VERSION="20"

echo "Step 1: System Update"
echo "--------------------------------------------"
apt-get update
apt-get upgrade -y

echo ""
echo "Step 2: Install Required Packages"
echo "--------------------------------------------"
apt-get install -y \
    curl \
    git \
    nginx \
    postgresql-client \
    build-essential \
    certbot \
    python3-certbot-nginx

echo ""
echo "Step 3: Install Node.js ${NODE_VERSION}"
echo "--------------------------------------------"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
fi

node_version=$(node --version)
npm_version=$(npm --version)
echo "✓ Node.js installed: ${node_version}"
echo "✓ npm installed: ${npm_version}"

echo ""
echo "Step 4: Create Application User"
echo "--------------------------------------------"
if id "${APP_USER}" &>/dev/null; then
    echo "User ${APP_USER} already exists"
else
    useradd -r -s /bin/bash -d ${APP_DIR} -m ${APP_USER}
    echo "✓ Created user: ${APP_USER}"
fi

echo ""
echo "Step 5: Create Application Directory"
echo "--------------------------------------------"
mkdir -p ${APP_DIR}
mkdir -p ${APP_DIR}/logs
chown -R ${APP_USER}:${APP_USER} ${APP_DIR}
echo "✓ Created directory: ${APP_DIR}"

echo ""
echo "Step 6: Clone Repository (Manual Step)"
echo "--------------------------------------------"
echo "MANUAL ACTION REQUIRED:"
echo "1. Clone your repository to ${APP_DIR}"
echo "   Example: git clone https://github.com/yourusername/trading-platform.git ${APP_DIR}"
echo "2. Or upload your built application files to ${APP_DIR}"
echo ""
read -p "Press Enter when you have placed the application files in ${APP_DIR}..."

echo ""
echo "Step 7: Install Node.js Dependencies"
echo "--------------------------------------------"
cd ${APP_DIR}
sudo -u ${APP_USER} npm install --production
echo "✓ Dependencies installed"

echo ""
echo "Step 8: Build Application"
echo "--------------------------------------------"
sudo -u ${APP_USER} npm run build
echo "✓ Application built"

echo ""
echo "Step 9: Configure Environment Variables"
echo "--------------------------------------------"
if [ ! -f "${APP_DIR}/.env" ]; then
    echo "MANUAL ACTION REQUIRED:"
    echo "1. Copy .env.production.example to .env"
    echo "   cp ${APP_DIR}/.env.production.example ${APP_DIR}/.env"
    echo "2. Edit ${APP_DIR}/.env with your actual configuration"
    echo "3. Generate secrets with:"
    echo "   node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    echo ""
    read -p "Press Enter when you have configured ${APP_DIR}/.env..."
    chown ${APP_USER}:${APP_USER} ${APP_DIR}/.env
    chmod 600 ${APP_DIR}/.env
else
    echo "✓ .env file already exists"
fi

echo ""
echo "Step 10: Install Systemd Service"
echo "--------------------------------------------"
cp ${APP_DIR}/deployment/systemd/trading-platform.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable ${APP_NAME}
echo "✓ Systemd service installed and enabled"

echo ""
echo "Step 11: Configure Nginx"
echo "--------------------------------------------"
if [ ! -f "/etc/nginx/sites-available/${APP_NAME}" ]; then
    cp ${APP_DIR}/deployment/nginx/trading-platform.conf /etc/nginx/sites-available/${APP_NAME}
    
    echo "MANUAL ACTION REQUIRED:"
    echo "1. Edit /etc/nginx/sites-available/${APP_NAME}"
    echo "2. Replace YOUR_DOMAIN.com with your actual domain"
    echo ""
    read -p "Press Enter when you have configured the Nginx file..."
    
    # Enable site
    ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/${APP_NAME}
    
    # Test configuration
    nginx -t
    
    systemctl reload nginx
    echo "✓ Nginx configured and reloaded"
else
    echo "✓ Nginx configuration already exists"
fi

echo ""
echo "Step 12: Configure SSL with Let's Encrypt"
echo "--------------------------------------------"
echo "MANUAL ACTION REQUIRED:"
echo "Run the following command to obtain SSL certificates:"
echo "  certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com"
echo ""
read -p "Press Enter to continue or Ctrl+C to exit and configure SSL manually later..."

echo ""
echo "Step 13: Configure Firewall"
echo "--------------------------------------------"
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    echo "✓ Firewall configured (UFW)"
else
    echo "⚠ UFW not installed. Configure firewall manually."
fi

echo ""
echo "Step 14: Start Application"
echo "--------------------------------------------"
systemctl start ${APP_NAME}
systemctl status ${APP_NAME} --no-pager
echo "✓ Application started"

echo ""
echo "============================================"
echo "Installation Complete!"
echo "============================================"
echo ""
echo "Next Steps:"
echo "1. Verify application is running:"
echo "   systemctl status ${APP_NAME}"
echo ""
echo "2. View logs:"
echo "   journalctl -u ${APP_NAME} -f"
echo ""
echo "3. Test the application:"
echo "   curl http://localhost:5000/api/health"
echo ""
echo "4. Configure SSL certificates (if not done):"
echo "   certbot --nginx -d YOUR_DOMAIN.com"
echo ""
echo "5. Configure database backups (see backup.sh)"
echo ""
echo "Useful Commands:"
echo "  Start:   systemctl start ${APP_NAME}"
echo "  Stop:    systemctl stop ${APP_NAME}"
echo "  Restart: systemctl restart ${APP_NAME}"
echo "  Logs:    journalctl -u ${APP_NAME} -f"
echo "  Status:  systemctl status ${APP_NAME}"
echo ""
