#!/bin/bash

# ============================================
# Trading Platform - Health Monitoring Script
# ============================================
# Continuous health check monitoring with alerting
# Run via cron or systemd timer:
#   */5 * * * * /var/www/trading-platform/deployment/scripts/health-monitor.sh

set -e

# Configuration
APP_NAME="trading-platform"
HEALTH_URL="http://localhost:5000/api/health"
TIMEOUT=5
MAX_FAILURES=3
STATE_FILE="/tmp/${APP_NAME}-health-state"
LOG_FILE="/var/log/${APP_NAME}-health.log"

# Alert configuration (customize for your environment)
ALERT_EMAIL="admin@example.com"
ALERT_SLACK_WEBHOOK=""  # Add your Slack webhook URL here

# ============================================
# Functions
# ============================================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a ${LOG_FILE}
}

send_alert() {
    local message="$1"
    
    log "ALERT: ${message}"
    
    # Email alert (if mail is configured)
    if command -v mail &> /dev/null; then
        echo "${message}" | mail -s "Trading Platform Health Alert" ${ALERT_EMAIL}
    fi
    
    # Slack alert (if webhook is configured)
    if [ ! -z "${ALERT_SLACK_WEBHOOK}" ]; then
        curl -X POST ${ALERT_SLACK_WEBHOOK} \
            -H 'Content-Type: application/json' \
            -d "{\"text\":\"🚨 Trading Platform Alert: ${message}\"}" \
            --silent --show-error --max-time 10 || true
    fi
    
    # Log to system journal
    logger -t ${APP_NAME} -p daemon.err "${message}"
}

# ============================================
# Health Check
# ============================================

# Perform health check
if HEALTH_RESPONSE=$(curl --fail --silent --show-error --max-time ${TIMEOUT} ${HEALTH_URL} 2>&1); then
    # Health check passed
    log "Health check OK"
    
    # Reset failure counter
    echo "0" > ${STATE_FILE}
    
    # Parse response (requires jq, optional)
    if command -v jq &> /dev/null; then
        STATUS=$(echo ${HEALTH_RESPONSE} | jq -r '.status')
        DB_LATENCY=$(echo ${HEALTH_RESPONSE} | jq -r '.database.latency')
        MEMORY_USED=$(echo ${HEALTH_RESPONSE} | jq -r '.memory.used')
        log "Status: ${STATUS}, DB Latency: ${DB_LATENCY}, Memory: ${MEMORY_USED}"
    fi
    
    exit 0
else
    # Health check failed
    log "Health check FAILED"
    
    # Get current failure count
    if [ -f ${STATE_FILE} ]; then
        FAILURE_COUNT=$(cat ${STATE_FILE})
    else
        FAILURE_COUNT=0
    fi
    
    # Increment failure count
    FAILURE_COUNT=$((FAILURE_COUNT + 1))
    echo ${FAILURE_COUNT} > ${STATE_FILE}
    
    log "Failure count: ${FAILURE_COUNT}/${MAX_FAILURES}"
    
    # Send alert if threshold reached
    if [ ${FAILURE_COUNT} -ge ${MAX_FAILURES} ]; then
        send_alert "Health check failed ${FAILURE_COUNT} times. Application may be down. Check systemctl status ${APP_NAME} and journalctl -u ${APP_NAME}"
        
        # Optional: Attempt auto-restart (use with caution)
        # systemctl restart ${APP_NAME}
        # log "Attempted automatic service restart"
    fi
    
    exit 1
fi
