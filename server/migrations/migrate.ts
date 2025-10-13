import { db } from '../db';
import { sql } from 'drizzle-orm';
import * as schema from '@shared/schema';

async function migrate() {
  console.log('Starting database migration...');

  try {
    // Drop existing tables (development only)
    await db.execute(sql`DROP TABLE IF EXISTS audit_logs CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS sso_tokens CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS sessions CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS kyc_documents CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS transactions CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS trades CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS positions CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS orders CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS candles CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS symbols CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS accounts CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS order_type CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS order_side CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS order_status CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS transaction_type CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS transaction_status CASCADE`);
    await db.execute(sql`DROP TYPE IF EXISTS kyc_status CASCADE`);

    // Create enums
    await db.execute(sql`CREATE TYPE order_type AS ENUM ('market', 'limit', 'stop', 'stop_limit')`);
    await db.execute(sql`CREATE TYPE order_side AS ENUM ('buy', 'sell')`);
    await db.execute(sql`CREATE TYPE order_status AS ENUM ('pending', 'filled', 'partial', 'cancelled', 'rejected')`);
    await db.execute(sql`CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal')`);
    await db.execute(sql`CREATE TYPE transaction_status AS ENUM ('pending', 'approved', 'rejected', 'processing', 'completed')`);
    await db.execute(sql`CREATE TYPE kyc_status AS ENUM ('pending', 'approved', 'rejected', 'under_review')`);

    // Create tables
    await db.execute(sql`
      CREATE TABLE users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        email_verified BOOLEAN DEFAULT FALSE,
        two_factor_enabled BOOLEAN DEFAULT FALSE,
        two_factor_secret TEXT,
        reset_token TEXT,
        reset_token_expiry TIMESTAMP,
        verification_token TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        trading_enabled BOOLEAN DEFAULT TRUE,
        external_id TEXT,
        role TEXT DEFAULT 'client',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE accounts (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id VARCHAR NOT NULL REFERENCES users(id),
        balance DECIMAL(18, 2) DEFAULT 0,
        currency TEXT DEFAULT 'USD',
        leverage INTEGER DEFAULT 1,
        margin_level DECIMAL(10, 2),
        equity DECIMAL(18, 2),
        free_margin DECIMAL(18, 2),
        used_margin DECIMAL(18, 2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE symbols (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        symbol TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        type TEXT DEFAULT 'forex',
        digits INTEGER DEFAULT 5,
        contract_size DECIMAL(18, 2) DEFAULT 100000,
        min_lot DECIMAL(10, 2) DEFAULT 0.01,
        max_lot DECIMAL(10, 2) DEFAULT 100,
        lot_step DECIMAL(10, 2) DEFAULT 0.01,
        spread DECIMAL(10, 5) DEFAULT 0.00002,
        commission DECIMAL(10, 2) DEFAULT 0,
        swap_long DECIMAL(10, 2) DEFAULT 0,
        swap_short DECIMAL(10, 2) DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE candles (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        symbol TEXT NOT NULL,
        interval TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        open DECIMAL(18, 8) NOT NULL,
        high DECIMAL(18, 8) NOT NULL,
        low DECIMAL(18, 8) NOT NULL,
        close DECIMAL(18, 8) NOT NULL,
        volume DECIMAL(18, 2),
        cached_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE orders (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        account_id VARCHAR NOT NULL REFERENCES accounts(id),
        symbol TEXT NOT NULL,
        type order_type NOT NULL,
        side order_side NOT NULL,
        volume DECIMAL(10, 2) NOT NULL,
        price DECIMAL(18, 8),
        stop_price DECIMAL(18, 8),
        take_profit DECIMAL(18, 8),
        stop_loss DECIMAL(18, 8),
        filled_volume DECIMAL(10, 2) DEFAULT 0,
        status order_status DEFAULT 'pending',
        open_price DECIMAL(18, 8),
        close_price DECIMAL(18, 8),
        commission DECIMAL(18, 2) DEFAULT 0,
        swap DECIMAL(18, 2) DEFAULT 0,
        profit DECIMAL(18, 2) DEFAULT 0,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        closed_at TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE positions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        account_id VARCHAR NOT NULL REFERENCES accounts(id),
        order_id VARCHAR REFERENCES orders(id),
        symbol TEXT NOT NULL,
        side order_side NOT NULL,
        volume DECIMAL(10, 2) NOT NULL,
        open_price DECIMAL(18, 8) NOT NULL,
        current_price DECIMAL(18, 8),
        take_profit DECIMAL(18, 8),
        stop_loss DECIMAL(18, 8),
        commission DECIMAL(18, 2) DEFAULT 0,
        swap DECIMAL(18, 2) DEFAULT 0,
        profit DECIMAL(18, 2) DEFAULT 0,
        margin_required DECIMAL(18, 2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE trades (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        account_id VARCHAR NOT NULL REFERENCES accounts(id),
        position_id VARCHAR REFERENCES positions(id),
        order_id VARCHAR REFERENCES orders(id),
        symbol TEXT NOT NULL,
        side order_side NOT NULL,
        volume DECIMAL(10, 2) NOT NULL,
        open_price DECIMAL(18, 8) NOT NULL,
        close_price DECIMAL(18, 8),
        take_profit DECIMAL(18, 8),
        stop_loss DECIMAL(18, 8),
        commission DECIMAL(18, 2) DEFAULT 0,
        swap DECIMAL(18, 2) DEFAULT 0,
        profit DECIMAL(18, 2) DEFAULT 0,
        closed_by TEXT,
        opened_at TIMESTAMP NOT NULL,
        closed_at TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE transactions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        account_id VARCHAR NOT NULL REFERENCES accounts(id),
        type transaction_type NOT NULL,
        amount DECIMAL(18, 2) NOT NULL,
        currency TEXT DEFAULT 'USD',
        status transaction_status DEFAULT 'pending',
        method TEXT,
        reference TEXT,
        notes TEXT,
        processed_by TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        processed_at TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE kyc_documents (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id VARCHAR NOT NULL REFERENCES users(id),
        document_type TEXT NOT NULL,
        file_name TEXT NOT NULL,
        file_url TEXT,
        status kyc_status DEFAULT 'pending',
        review_notes TEXT,
        reviewed_by TEXT,
        uploaded_at TIMESTAMP DEFAULT NOW(),
        reviewed_at TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE audit_logs (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id VARCHAR REFERENCES users(id),
        action TEXT NOT NULL,
        entity TEXT NOT NULL,
        entity_id TEXT,
        details JSONB,
        ip_address TEXT,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE sso_tokens (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        token TEXT NOT NULL UNIQUE,
        user_id VARCHAR NOT NULL REFERENCES users(id),
        admin_id TEXT,
        reason TEXT,
        ip_address TEXT,
        consumed BOOLEAN DEFAULT FALSE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        consumed_at TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE sessions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id VARCHAR NOT NULL REFERENCES users(id),
        refresh_token TEXT NOT NULL UNIQUE,
        ip_address TEXT,
        user_agent TEXT,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes
    await db.execute(sql`CREATE INDEX idx_orders_account_id ON orders(account_id)`);
    await db.execute(sql`CREATE INDEX idx_orders_status ON orders(status)`);
    await db.execute(sql`CREATE INDEX idx_positions_account_id ON positions(account_id)`);
    await db.execute(sql`CREATE INDEX idx_trades_account_id ON trades(account_id)`);
    await db.execute(sql`CREATE INDEX idx_transactions_account_id ON transactions(account_id)`);
    await db.execute(sql`CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id)`);
    await db.execute(sql`CREATE INDEX idx_candles_symbol_interval ON candles(symbol, interval, timestamp)`);

    // Insert default symbols
    await db.execute(sql`
      INSERT INTO symbols (symbol, name, type, digits, contract_size, spread) VALUES
      ('EURUSD', 'Euro / US Dollar', 'forex', 5, 100000, 0.00002),
      ('GBPUSD', 'British Pound / US Dollar', 'forex', 5, 100000, 0.00003),
      ('USDJPY', 'US Dollar / Japanese Yen', 'forex', 3, 100000, 0.002),
      ('BTCUSD', 'Bitcoin / US Dollar', 'crypto', 2, 1, 0.50),
      ('ETHUSD', 'Ethereum / US Dollar', 'crypto', 2, 1, 0.30),
      ('XAUUSD', 'Gold / US Dollar', 'commodity', 2, 100, 0.50),
      ('WTI', 'Crude Oil WTI', 'commodity', 2, 1000, 0.03)
    `);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

migrate().catch(console.error);
