#!/bin/bash

# ============================================
# Trading Platform - Update Script
# ============================================
# This script updates the trading platform to the latest version
# Run as root or with sudo

set -e  # Exit on any error

echo "============================================"
echo "Trading Platform - Update Script"
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
BACKUP_DIR="/var/backups/${APP_NAME}"

echo "Step 1: Create Backup"
echo "--------------------------------------------"
mkdir -p ${BACKUP_DIR}
BACKUP_FILE="${BACKUP_DIR}/backup-$(date +%Y%m%d-%H%M%S).tar.gz"

echo "Creating backup: ${BACKUP_FILE}"
tar -czf ${BACKUP_FILE} \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='logs' \
    -C ${APP_DIR} .

echo "✓ Backup created: ${BACKUP_FILE}"

echo ""
echo "Step 2: Pull Latest Code"
echo "--------------------------------------------"
cd ${APP_DIR}

if [ -d ".git" ]; then
    sudo -u ${APP_USER} git fetch origin
    sudo -u ${APP_USER} git pull origin main
    echo "✓ Code updated from Git"
else
    echo "⚠ Not a Git repository. Upload new files manually."
    read -p "Press Enter when you have updated the application files..."
fi

echo ""
echo "Step 3: Install/Update Dependencies"
echo "--------------------------------------------"
sudo -u ${APP_USER} npm install --production
echo "✓ Dependencies updated"

echo ""
echo "Step 4: Build Application"
echo "--------------------------------------------"
sudo -u ${APP_USER} npm run build
echo "✓ Application built"

echo ""
echo "Step 5: Run Database Migrations"
echo "--------------------------------------------"
echo "MANUAL ACTION REQUIRED:"
echo "Review and run database migrations if needed:"
echo "  cd ${APP_DIR}"
echo "  npm run db:migrate"
echo ""
read -p "Press Enter to continue without migrations or Ctrl+C to run them manually..."

echo ""
echo "Step 6: Restart Application"
echo "--------------------------------------------"
systemctl restart ${APP_NAME}
sleep 3
systemctl status ${APP_NAME} --no-pager
echo "✓ Application restarted"

echo ""
echo "Step 7: Verify Application"
echo "--------------------------------------------"

# Health check with retries and exponential backoff
MAX_RETRIES=3
RETRY_DELAY=2
TIMEOUT=5

for attempt in $(seq 1 ${MAX_RETRIES}); do
    echo "Health check attempt ${attempt}/${MAX_RETRIES}..."
    
    if HEALTH_CHECK=$(curl --fail --silent --show-error --max-time ${TIMEOUT} \
        http://localhost:5000/api/health 2>&1); then
        echo "✓ Application is healthy"
        echo "${HEALTH_CHECK}" | head -n 1
        break
    else
        if [ ${attempt} -lt ${MAX_RETRIES} ]; then
            WAIT_TIME=$((RETRY_DELAY * attempt))
            echo "⚠ Health check failed, retrying in ${WAIT_TIME}s..."
            sleep ${WAIT_TIME}
        else
            echo ""
            echo "❌ CRITICAL: Health check failed after ${MAX_RETRIES} attempts"
            echo "Application may not be running correctly!"
            echo ""
            echo "Check status:  systemctl status ${APP_NAME}"
            echo "View logs:     journalctl -u ${APP_NAME} -n 50"
            echo ""
            echo "Rollback if needed:"
            echo "  systemctl stop ${APP_NAME}"
            echo "  tar -xzf ${BACKUP_FILE} -C ${APP_DIR}"
            echo "  systemctl start ${APP_NAME}"
            echo ""
            exit 1
        fi
    fi
done

echo ""
echo "Step 8: Cleanup Old Backups"
echo "--------------------------------------------"
# Keep only last 10 backups
cd ${BACKUP_DIR}
ls -t backup-*.tar.gz | tail -n +11 | xargs -r rm
BACKUP_COUNT=$(ls -1 backup-*.tar.gz 2>/dev/null | wc -l)
echo "✓ Keeping ${BACKUP_COUNT} most recent backups"

echo ""
echo "============================================"
echo "Update Complete!"
echo "============================================"
echo ""
echo "Backup Location: ${BACKUP_FILE}"
echo ""
echo "If something went wrong, restore with:"
echo "  systemctl stop ${APP_NAME}"
echo "  tar -xzf ${BACKUP_FILE} -C ${APP_DIR}"
echo "  systemctl start ${APP_NAME}"
echo ""
echo "View logs:"
echo "  journalctl -u ${APP_NAME} -f"
echo ""
