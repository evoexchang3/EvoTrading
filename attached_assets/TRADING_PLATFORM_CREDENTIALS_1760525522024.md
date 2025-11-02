# Trading Platform Integration Credentials

> ⚠️ **SECURITY WARNING**: This file contains NO real credentials - only placeholders and instructions.
> Contact your CRM administrator to obtain actual credential values.
> See `.env.example` in the root directory for the complete environment variable template.

## 🔐 How to Get Your Credentials

### Step 1: Contact CRM Administrator

Contact the CRM administrator to request the following credentials:

**What to Request:**
1. DATABASE_URL (PostgreSQL connection string)
2. WEBHOOK_SECRET (64-character hex string for HMAC signing)
3. CRM_WEBHOOK_URL (CRM webhook endpoint URL)
4. CRM_BASE_URL (CRM API base URL)
5. CRM_SERVICE_TOKEN (64-character hex token for API authentication)

**Secure Sharing:**
- Request credentials via encrypted email or secure messaging
- Use a password manager for secure storage
- Never share via plain text channels (Slack, SMS, etc.)

### Step 2: Credentials You Need

The CRM administrator will provide you with these **confidential** credentials:

#### 1. Database Connection String
```bash
DATABASE_URL=<YOUR_DATABASE_CONNECTION_STRING>
# Format: postgresql://username:password@host:port/database?sslmode=require
```
**What it's for:** Direct access to the shared PostgreSQL database  
**Security:** Keep this secret - it grants full database access  
**Source:** Request from CRM administrator

#### 2. Webhook Secret
```bash
WEBHOOK_SECRET=<GENERATE_64_CHAR_HEX_SECRET>
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
**What it's for:** HMAC-SHA256 signing of webhooks you send TO the CRM  
**Security:** Must be identical on both systems for signature verification  
**Source:** Request from CRM administrator (must match their configuration)

#### 3. CRM Webhook URL
```bash
CRM_WEBHOOK_URL=<CRM_WEBHOOK_ENDPOINT_URL>
# Example format: https://your-crm-domain.com/api/webhooks/trading
```
**What it's for:** Endpoint where you send webhook events  
**Source:** Request from CRM administrator

#### 4. CRM Base URL
```bash
CRM_BASE_URL=<CRM_API_BASE_URL>
# Example format: https://your-crm-domain.com/api
```
**What it's for:** Base URL for CRM API service calls  
**Source:** Request from CRM administrator

#### 5. CRM Service Token
```bash
CRM_SERVICE_TOKEN=<GENERATE_64_CHAR_HEX_TOKEN>
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
**What it's for:** Bearer token authentication for API calls and webhook Authorization header  
**Security:** Must match CRM configuration  
**Source:** Request from CRM administrator

---

## 📝 How CRM Admin Shares Credentials

### Method 1: Secure Environment Variable Sharing

The CRM admin can retrieve credentials from their secure environment configuration:

1. Access the CRM system's environment configuration
2. Copy the values for required credentials
3. Share via secure channel (encrypted email, password manager share, secure vault)
4. Never send via plain text communication

### Method 2: Security Best Practices

**⚠️ Critical Security Rules:**
- Never commit credentials to Git repositories
- Never share in plain text channels (chat, email without encryption)
- Use dedicated password management tools
- Rotate credentials on a regular schedule (quarterly recommended)
- Immediately rotate if compromise suspected

---

## ✅ Verification Checklist

After receiving credentials from CRM admin, verify you have:

- [ ] **DATABASE_URL** - PostgreSQL connection string starting with `postgresql://`
- [ ] **WEBHOOK_SECRET** - 64-character hexadecimal string
- [ ] **CRM_WEBHOOK_URL** - HTTPS URL for webhook endpoint
- [ ] **CRM_BASE_URL** - HTTPS URL for API base
- [ ] **CRM_SERVICE_TOKEN** - 64-character hex token

Additionally, you must generate yourself:

- [ ] **JWT_ACCESS_SECRET** - Your own 64-character hex secret
- [ ] **JWT_REFRESH_SECRET** - Your own 64-character hex secret

**Generation Command:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧪 Test Your Credentials

### Test 1: Database Connection

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true }
});

// Test query
pool.query('SELECT COUNT(*) FROM clients', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected! Client count:', res.rows[0].count);
  }
  pool.end();
});
```

### Test 2: Webhook Signature

```javascript
const crypto = require('crypto');

const payload = {
  event: 'client.registered',
  data: { email: 'test@example.com' },
  timestamp: Date.now()
};

const signature = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest('hex');

console.log('✅ Webhook signature generated:', signature.substring(0, 16) + '...');
```

### Test 3: Webhook Delivery

```javascript
const crypto = require('crypto');

async function testWebhook() {
  const payload = {
    event: 'client.registered',
    data: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    },
    timestamp: Date.now()
  };

  const signature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');

  try {
    const response = await fetch(process.env.CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'Authorization': `Bearer ${process.env.CRM_SERVICE_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ Webhook delivered successfully');
    } else {
      console.error('❌ Webhook delivery failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Webhook error:', error.message);
  }
}

testWebhook();
```

---

## 🔄 Credential Rotation

### When to Rotate:

1. **Scheduled rotation** - Quarterly (every 90 days) for compliance
2. **Security incident** - Immediate rotation if credentials compromised
3. **Personnel changes** - When team members with credential access leave
4. **System migration** - When moving to new infrastructure

### Rotation Process:

1. **Coordinate with CRM admin** - Both systems must update simultaneously
2. **Generate new credentials** - Use cryptographically secure random generation
3. **Test in staging** - Verify new credentials work before production
4. **Deploy simultaneously** - Update both Trading Platform and CRM at same time
5. **Verify** - Test all integrations after rotation
6. **Document** - Record rotation date and reason

---

## 📋 Environment Variable Summary

Copy this template into your `.env` file and fill in actual values:

```bash
# ===== REQUEST FROM CRM ADMINISTRATOR =====
DATABASE_URL=<YOUR_DATABASE_CONNECTION_STRING>
WEBHOOK_SECRET=<GENERATE_64_CHAR_HEX_SECRET>
CRM_WEBHOOK_URL=<CRM_WEBHOOK_ENDPOINT_URL>
CRM_BASE_URL=<CRM_API_BASE_URL>
CRM_SERVICE_TOKEN=<GENERATE_64_CHAR_HEX_TOKEN>

# ===== GENERATE YOURSELF =====
JWT_ACCESS_SECRET=<GENERATE_YOUR_JWT_ACCESS_SECRET>
JWT_REFRESH_SECRET=<GENERATE_YOUR_JWT_REFRESH_SECRET>
```

See `.env.example` in the root directory for the complete template with all optional variables.

---

## ⚠️ Security Notes

1. **Never commit `.env` to Git** - Already configured in `.gitignore`
2. **Use environment variables** - Never hardcode credentials in code
3. **Coordinate rotation** - DATABASE_URL and WEBHOOK_SECRET must match CRM
4. **Secure storage** - Use encrypted password manager
5. **Access control** - Limit who can view production credentials
6. **Audit logging** - Track when and by whom credentials were accessed

---

**Ready to integrate? Request all credentials from your CRM administrator using this checklist! 🔐**
