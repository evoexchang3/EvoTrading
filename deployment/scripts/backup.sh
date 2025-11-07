#!/bin/bash

# ============================================
# Trading Platform - Backup Script
# ============================================
# This script backs up the application and database
# Run as root or with sudo
# Add to cron for automated backups:
#   0 2 * * * /var/www/trading-platform/deployment/scripts/backup.sh

set -e  # Exit on any error

# Configuration
APP_NAME="trading-platform"
APP_DIR="/var/www/${APP_NAME}"
BACKUP_BASE_DIR="/var/backups/${APP_NAME}"
BACKUP_RETENTION_DAYS=30

# Create backup directories
mkdir -p ${BACKUP_BASE_DIR}/app
mkdir -p ${BACKUP_BASE_DIR}/db

# Timestamp for backup files
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "============================================"
echo "Trading Platform - Backup Script"
echo "Timestamp: ${TIMESTAMP}"
echo "============================================"
echo ""

# ============================================
# 1. Application Backup
# ============================================
echo "Step 1: Backup Application Files"
echo "--------------------------------------------"
APP_BACKUP_FILE="${BACKUP_BASE_DIR}/app/app-${TIMESTAMP}.tar.gz"

tar -czf ${APP_BACKUP_FILE} \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='logs/*.log' \
    -C ${APP_DIR} \
    .env \
    site-config.yml \
    package.json \
    package-lock.json \
    server \
    client \
    shared \
    2>/dev/null || true

APP_SIZE=$(du -h ${APP_BACKUP_FILE} | cut -f1)
echo "✓ Application backup created: ${APP_BACKUP_FILE} (${APP_SIZE})"

# ============================================
# 2. Database Backup
# ============================================
echo ""
echo "Step 2: Backup Database"
echo "--------------------------------------------"

# Load environment variables
if [ -f "${APP_DIR}/.env" ]; then
    export $(grep -v '^#' ${APP_DIR}/.env | xargs)
fi

if [ -z "${DATABASE_URL}" ]; then
    echo "⚠ WARNING: DATABASE_URL not found. Skipping database backup."
else
    DB_BACKUP_FILE="${BACKUP_BASE_DIR}/db/db-${TIMESTAMP}.sql.gz"
    
    # Validate DATABASE_URL format
    if ! echo "${DATABASE_URL}" | grep -q '^postgresql://'; then
        echo "❌ ERROR: Invalid DATABASE_URL format (must start with postgresql://)"
        echo "Skipping database backup."
    else
        # Use psql to extract connection details (handles percent-encoding)
        # Test connection first
        if ! PGPASSWORD="" psql "${DATABASE_URL}" -c '\q' 2>/dev/null; then
            echo "⚠ WARNING: Cannot connect to database. Attempting backup anyway..."
        fi
        
        # Create backup using pg_dump with full connection string
        # This handles percent-encoded passwords and complex URIs correctly
        if pg_dump "${DATABASE_URL}" \
            --no-owner \
            --no-acl \
            --clean \
            --if-exists \
            2>/dev/null | gzip > ${DB_BACKUP_FILE}; then
            
            # Verify backup was created and has content
            if [ -s "${DB_BACKUP_FILE}" ]; then
                DB_SIZE=$(du -h ${DB_BACKUP_FILE} | cut -f1)
                echo "✓ Database backup created: ${DB_BACKUP_FILE} (${DB_SIZE})"
            else
                echo "❌ ERROR: Database backup file is empty"
                rm -f ${DB_BACKUP_FILE}
                exit 1
            fi
        else
            echo "❌ ERROR: pg_dump failed"
            echo "Check DATABASE_URL format and database connectivity"
            rm -f ${DB_BACKUP_FILE}
            exit 1
        fi
    fi
fi

# ============================================
# 3. Cleanup Old Backups
# ============================================
echo ""
echo "Step 3: Cleanup Old Backups"
echo "--------------------------------------------"

# Delete app backups older than retention period
find ${BACKUP_BASE_DIR}/app -name "app-*.tar.gz" -mtime +${BACKUP_RETENTION_DAYS} -delete
APP_COUNT=$(ls -1 ${BACKUP_BASE_DIR}/app/app-*.tar.gz 2>/dev/null | wc -l)
echo "✓ App backups: ${APP_COUNT} files (keeping last ${BACKUP_RETENTION_DAYS} days)"

# Delete database backups older than retention period
find ${BACKUP_BASE_DIR}/db -name "db-*.sql.gz" -mtime +${BACKUP_RETENTION_DAYS} -delete
DB_COUNT=$(ls -1 ${BACKUP_BASE_DIR}/db/db-*.sql.gz 2>/dev/null | wc -l)
echo "✓ Database backups: ${DB_COUNT} files (keeping last ${BACKUP_RETENTION_DAYS} days)"

# ============================================
# 4. Backup Summary
# ============================================
echo ""
echo "============================================"
echo "Backup Complete!"
echo "============================================"
echo ""
echo "Application: ${APP_BACKUP_FILE}"
if [ ! -z "${DATABASE_URL}" ]; then
    echo "Database:    ${DB_BACKUP_FILE}"
fi
echo ""
echo "Total backup size:"
du -sh ${BACKUP_BASE_DIR}
echo ""

# ============================================
# 5. Optional: Upload to Remote Storage
# ============================================
# Uncomment and configure to upload backups to S3, Google Cloud Storage, etc.
# Example for S3:
# aws s3 cp ${APP_BACKUP_FILE} s3://your-bucket/backups/app/
# aws s3 cp ${DB_BACKUP_FILE} s3://your-bucket/backups/db/

exit 0
