# Trading Platform

![CI](https://github.com/<OWNER>/<REPO>/workflows/CI/badge.svg)
![Secret Scan](https://github.com/<OWNER>/<REPO>/workflows/Secret%20Scan/badge.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![License](https://img.shields.io/badge/license-Proprietary-red)

A production-ready client-facing trading platform for forex, cryptocurrencies, and commodities with real-time market data, order execution, and comprehensive account management.

**Container Images**: `ghcr.io/<OWNER>/<REPO>:latest` | `ghcr.io/<OWNER>/<REPO>:v*.*.*`

## Features

- **Multi-Asset Trading**: Forex, cryptocurrencies, and commodities
- **Real-time Market Data**: Live quotes and WebSocket updates via Twelve Data
- **Order Management**: Market, limit, and stop orders with full execution tracking
- **Account Management**: Multi-currency accounts with leverage control
- **CRM Integration**: Seamless webhook integration for deposits, withdrawals, and KYC
- **Multi-language Support**: 9 languages with built-in translation system
- **Responsive UI**: Modern interface built with React and shadcn/ui

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TanStack Query, shadcn/ui, Tailwind CSS
- **Backend**: Node.js 20, Express, TypeScript
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM with type-safe queries
- **Real-time**: WebSocket (ws library)
- **Authentication**: JWT with refresh tokens

## Security Notes

### Environment Variables

**⚠️ CRITICAL**: This application requires sensitive environment variables that must **NEVER** be committed to version control.

#### Required Configuration

1. **Copy the template**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your values** in `.env`:
   - `DATABASE_URL` - PostgreSQL connection string (request from CRM admin)
   - `JWT_ACCESS_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `JWT_REFRESH_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `WEBHOOK_SECRET` - HMAC secret for webhooks (coordinate with CRM admin)
   - `CRM_BASE_URL` - CRM API base URL
   - `CRM_SERVICE_TOKEN` - CRM API authentication token
   - Optional: Market data API keys (TWELVEDATA_API_KEY, MARKETAUX_API_KEY, EODHD_API_KEY)

3. **Never commit `.env`** - Already configured in `.gitignore`

#### Security Best Practices

- ✅ Use environment variables for all secrets
- ✅ Rotate credentials quarterly or after suspected compromise
- ✅ Store production credentials in secure vault/password manager
- ✅ Use different credentials for dev/staging/prod environments
- ❌ Never hardcode secrets in source code
- ❌ Never commit `.env` files to Git
- ❌ Never share credentials via plain text (email, chat, etc.)

#### CI/CD Secret Scanning

This repository includes automated secret scanning via GitHub Actions:
- Runs on every pull request and push to main
- Uses [Gitleaks](https://github.com/gitleaks/gitleaks) to detect hardcoded secrets
- Fails CI if secrets are detected in tracked files
- See `.gitleaks.toml` for configuration

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database (or Neon connection string)
- npm or yarn package manager

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd trading-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and fill in your values
   ```

4. **Run database migrations**:
   ```bash
   npm run db:migrate
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

### Docker Development

See [`docker-compose.dev.yml`](./docker-compose.dev.yml) for local development with Docker.

```bash
docker-compose -f docker-compose.dev.yml up
```

## Production Deployment

### Self-Hosting

For self-hosting on Ubuntu 24.04 LTS or any container platform, see:
- **Self-Host Pack**: [`infra/self-host/`](./infra/self-host/) - Complete deployment configuration
- **Deployment Guide**: [`infra/self-host/README-SELF-HOST.md`](./infra/self-host/README-SELF-HOST.md)

The self-host pack includes:
- Docker Compose configuration for production
- Caddy reverse proxy with automatic HTTPS
- Health checks and restart policies
- Environment-agnostic deployment instructions

### Container Registry

Pre-built Docker images are available on GitHub Container Registry:

```bash
docker pull ghcr.io/<owner>/<repo>:latest
# or specific version
docker pull ghcr.io/<owner>/<repo>:v1.0.0
```

## Database

### Schema

The application uses Drizzle ORM with the following main tables:
- `clients` - User accounts and profiles
- `accounts` - Trading accounts with balances (real, demo, bonus)
- `positions` - Open and closed trading positions
- `orders` - Order history and pending orders
- `transactions` - Deposits, withdrawals, and P/L records
- `symbols` - Tradeable instruments
- `news_articles` - Financial news feed
- `economic_events` - Economic calendar

### Migrations

```bash
# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate

# View database schema
npm run db:studio
```

**⚠️ Production Safety**: Destructive migrations are blocked in production. See `server/migrations/` for details.

## Security Configuration

### CORS (Cross-Origin Resource Sharing)

The application uses deny-by-default CORS for security. **Same-origin requests work automatically with no configuration required.**

```bash
# Optional: Enable additional origins for cross-origin requests
CORS_ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com
```

**Notes:**
- If your UI and API are served from the same origin (same domain/port), CORS configuration is **not required**
- WebSocket connections at `/ws` work without CORS configuration
- Only set `CORS_ALLOWED_ORIGINS` when accessing the API from different domains

### Rate Limiting

Authentication and CRM endpoints are rate-limited to prevent brute force attacks:

```bash
# Default values (already configured for existing flows)
RATE_LIMIT_MAX=100                 # Maximum 100 requests
RATE_LIMIT_WINDOW_MS=900000        # Per 15 minutes (900,000ms)
```

**Protected endpoints:**
- `/api/auth/*` - Login, register, token refresh
- `/api/crm/*` - CRM integration endpoints

**Notes:**
- Default limits do not affect existing login/CRM flows
- Limits are per-IP address
- Can be tuned for high-traffic deployments

## API Endpoints

### Health Check

```bash
GET /health
```

Returns application health status without touching database or external APIs.

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and invalidate session

### Trading

- `GET /api/trading/symbols` - List tradeable symbols
- `GET /api/trading/positions` - Get positions
- `POST /api/trading/positions` - Open position
- `PATCH /api/trading/positions/:id/close` - Close position
- `POST /api/trading/orders` - Place order

### CRM Integration

- `POST /api/crm/sso-token` - Generate SSO token (requires CRM_SERVICE_TOKEN)
- `GET /api/crm/sso-login` - SSO login
- `GET /api/crm/users/:userId` - Get user info (requires CRM_SERVICE_TOKEN)

## WebSocket

Real-time market data is available via WebSocket at `/ws`:

```javascript
const ws = new WebSocket('ws://localhost:5000/ws');

ws.on('message', (data) => {
  const update = JSON.parse(data);
  console.log('Market update:', update);
});
```

## Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Build
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate migration from schema changes
npm run db:migrate       # Apply pending migrations
npm run db:studio        # Open Drizzle Studio (database GUI)

# Secret Management
# Use the secrets-replacer CLI tool for safe secret rotation and auditing
node tools/secret-replacer/index.cjs audit                                    # List all environment variables
node tools/secret-replacer/index.cjs explain DATABASE_URL                     # Explain a specific variable
node tools/secret-replacer/index.cjs dry-run --from .env --target .env.new    # Preview changes (masked)
node tools/secret-replacer/index.cjs apply --from .env --target .env.new --backup  # Apply with backup

# See secrets-manifest.yml for complete documentation of all environment variables
# including purpose, required status, format, code locations, and rotation schedule

# Docker
docker build -t trading-platform .
docker-compose up
```

## Operational Profiles

### Development

**Required Environment Variables:**
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

**Optional:**
- `PORT` (default: 5000)
- `NODE_ENV=development`
- `LOG_FORMAT=pretty`

### Staging

**Required Environment Variables:**
- All development variables
- `WEBHOOK_SECRET` (for CRM integration testing)
- `CRM_BASE_URL`
- `CRM_SERVICE_TOKEN`

**Recommended:**
- `NODE_ENV=staging`
- `CORS_ALLOWED_ORIGINS`
- `RATE_LIMIT_MAX=100`
- `RATE_LIMIT_WINDOW_MS=900000`

### Production

**Required Environment Variables:**
- All staging variables
- `TWELVEDATA_API_KEY` (for real market data)
- `MARKETAUX_API_KEY` (for news)
- `EODHD_API_KEY` (for economic calendar)

**Mandatory Configuration:**
- `NODE_ENV=production`
- `LOG_FORMAT=json`
- `CORS_ALLOWED_ORIGINS` (comma-separated HTTPS URLs)
- `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS`

**Security Requirements:**
- All secrets must be rotated quarterly
- Use secret management service (HashiCorp Vault, AWS Secrets Manager, etc.)
- Enable audit logging
- Implement IP whitelisting for CRM endpoints

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure CI passes (including secret scan)
4. Open a pull request with detailed description

## License

Proprietary - All rights reserved

## Support

For integration support or credential requests, contact your CRM administrator.

For technical issues, see:
- [Integration Guide](./attached_assets/TRADING_PLATFORM_INTEGRATION_1760525522024.md)
- [Credentials Guide](./attached_assets/TRADING_PLATFORM_CREDENTIALS_1760525522024.md)
- [Quick Start Guide](./attached_assets/TRADING_PLATFORM_QUICKSTART_1760525522025.md)
