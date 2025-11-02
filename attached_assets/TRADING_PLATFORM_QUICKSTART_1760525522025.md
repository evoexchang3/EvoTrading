# Trading Platform Integration - Quick Start

> ⚠️ **SECURITY WARNING**: This file contains PLACEHOLDERS only - no real credentials.
> Real credentials must be provided by your CRM administrator and stored in environment variables.
> See `.env.example` in the root directory for the complete list of required variables.

## 🔐 Credentials Setup

All credentials must be obtained from your CRM administrator and configured as environment variables.

---

## 🚀 30-Second Setup

### Step 1: Add Environment Variables

**Copy the template from `.env.example` and fill in your actual values:**

```bash
# .env file for Trading Platform

# ===== SHARED DATABASE (PROVIDED BY CRM) =====
# Format: postgresql://username:password@host:port/database?sslmode=require
# Request this connection string from your CRM administrator
DATABASE_URL=<YOUR_DATABASE_CONNECTION_STRING>

# ===== WEBHOOK SECURITY (PROVIDED BY CRM) =====
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Must match the secret configured in the CRM system
WEBHOOK_SECRET=<GENERATE_64_CHAR_HEX_SECRET>
CRM_WEBHOOK_URL=<CRM_WEBHOOK_ENDPOINT_URL>

# ===== SERVICE API (PROVIDED BY CRM) =====
CRM_BASE_URL=<CRM_API_BASE_URL>
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
CRM_SERVICE_TOKEN=<GENERATE_64_CHAR_HEX_TOKEN>

# ===== YOUR JWT SECRETS (YOU GENERATE THESE) =====
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_ACCESS_SECRET=<GENERATE_YOUR_JWT_ACCESS_SECRET>
JWT_REFRESH_SECRET=<GENERATE_YOUR_JWT_REFRESH_SECRET>
```

⚠️ **IMPORTANT:** 
- Keep these credentials secure! Never commit to Git.
- Request DATABASE_URL, WEBHOOK_SECRET, CRM_BASE_URL, CRM_SERVICE_TOKEN from CRM admin
- Generate your own JWT secrets using the crypto command above
- Store all values in environment variables only

### Step 2: Install Dependencies

```bash
npm install pg
# or
yarn add pg
```

### Step 3: Test Database Connection

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true }
});

pool.query('SELECT COUNT(*) FROM clients')
  .then(res => console.log('✅ Connected! Clients:', res.rows[0].count))
  .catch(err => console.error('❌ Error:', err.message));
```

---

## 📡 Integration Architecture

```
┌─────────────────────┐
│ Trading Platform    │
└─────────────────────┘
         ↕
┌─────────────────────┐
│ Shared PostgreSQL   │ ← Both systems use SAME database
│ (CRM Database)      │
└─────────────────────┘
         ↕
┌─────────────────────┐
│   CRM System        │
└─────────────────────┘

+ Webhooks for events (deposits, KYC, etc.)
```

**Key Principle:** No data syncing needed - both systems share one database!

---

## 🔌 Core Integration Points

### 1. Read Client Data (Direct DB)
```javascript
// Get client account by email
const result = await pool.query(`
  SELECT a.* FROM accounts a
  JOIN clients c ON a.client_id = c.id
  WHERE c.email = $1
`, [clientEmail]);
```

### 2. Display Positions (Direct DB)
```javascript
// Get all open positions
const result = await pool.query(`
  SELECT * FROM positions
  WHERE account_id = $1 AND status = 'open'
`, [accountId]);
```

### 3. Open Position (Direct DB)
```javascript
// Insert new position
await pool.query(`
  INSERT INTO positions (account_id, symbol, side, quantity, open_price, current_price, status, leverage, initiator_type, initiator_id)
  VALUES ($1, $2, $3, $4, $5, $6, 'open', $7, 'client', $8)
`, [accountId, 'EUR/USD', 'buy', '10.00', '1.16028', '1.16028', 100, clientId]);
```

### 4. Send Webhook to CRM
```javascript
const crypto = require('crypto');

const payload = {
  event: 'client.registered',
  data: {
    email: 'client@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    dateOfBirth: '1990-01-15',
    country: 'US'
  },
  timestamp: Date.now()
};

const signature = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest('hex');

await fetch(process.env.CRM_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Signature': signature,
    'Authorization': `Bearer ${process.env.CRM_SERVICE_TOKEN}`
  },
  body: JSON.stringify(payload)
});
```

---

## 📊 Database Tables Reference

### Key Tables You'll Use

**clients** - Client information
- id, first_name, last_name, email, phone, kyc_status, etc.

**accounts** - Account balances & settings
- id, client_id, balance, real_balance, demo_balance, bonus_balance, equity, leverage

**positions** - Open/closed trades
- id, account_id, symbol, side, quantity, open_price, close_price, status, realized_pnl

**transactions** - Deposits, withdrawals, P/L
- id, account_id, type, amount, fund_type, status

---

## 🔔 Webhook Events to Send

Send these events TO the CRM:

1. **client.registered** - New client signs up
2. **deposit.completed** - Client deposits funds
3. **withdrawal.completed** - Client withdraws funds
4. **kyc.updated** - KYC status changes

**Format:**
```javascript
{
  event: 'client.registered',
  data: { /* event-specific data */ },
  timestamp: Date.now()
}
```

**Always include:** 
- `X-Webhook-Signature` header with HMAC-SHA256 signature
- `Authorization: Bearer` header with CRM_SERVICE_TOKEN

---

## ✅ Testing Checklist

- [ ] Database connection works
- [ ] Can read client data from `clients` table
- [ ] Can read positions from `positions` table
- [ ] Can create new position (test trade)
- [ ] Webhook signature generates correctly
- [ ] Client registration webhook sends successfully
- [ ] Deposit webhook sends successfully
- [ ] Both systems see same data instantly

---

## 📚 Full Documentation

- **Integration Guide:** `TRADING_PLATFORM_INTEGRATION.md`
- **Credentials Guide:** `TRADING_PLATFORM_CREDENTIALS.md`
- **This Quick Start:** `TRADING_PLATFORM_QUICKSTART.md`
- **Environment Template:** `.env.example` (in root directory)

---

## 🆘 Support

**Common Issues:**
- Database connection fails → Verify DATABASE_URL is copied correctly with `?sslmode=require`
- Webhook rejected → Verify WEBHOOK_SECRET matches exactly (no extra spaces)
- Position not showing → Ensure `account_id` is correct

---

## 📋 Credentials Summary

⚠️ **All credentials must be requested from your CRM administrator:**
- `DATABASE_URL` - Shared PostgreSQL database connection
- `WEBHOOK_SECRET` - HMAC signature secret for webhooks (64-char hex)
- `CRM_WEBHOOK_URL` - CRM webhook endpoint
- `CRM_BASE_URL` - CRM API base URL  
- `CRM_SERVICE_TOKEN` - Bearer token for API calls (64-char hex)

✏️ **You must generate yourself:**
- `JWT_ACCESS_SECRET` - Your JWT access secret (64-char hex minimum)
- `JWT_REFRESH_SECRET` - Your JWT refresh secret (64-char hex minimum)

---

**Ready to integrate? Request credentials from your CRM administrator and use `.env.example` as your template! 🚀**
