-- Migration: Add timezone support for charts and market hours
-- Created: 2024-11-10

-- Add timezone fields to symbols table for market hours tracking
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='symbols' AND column_name='exchange_timezone') THEN
    ALTER TABLE symbols ADD COLUMN exchange_timezone TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='symbols' AND column_name='trading_hours') THEN
    ALTER TABLE symbols ADD COLUMN trading_hours JSONB;
  END IF;
END $$;

-- Add timezone preference fields to user_preferences table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_preferences' AND column_name='timezone') THEN
    ALTER TABLE user_preferences ADD COLUMN timezone TEXT DEFAULT 'UTC';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_preferences' AND column_name='auto_detect_timezone') THEN
    ALTER TABLE user_preferences ADD COLUMN auto_detect_timezone BOOLEAN NOT NULL DEFAULT true;
  END IF;
END $$;

-- Convert candles timestamp columns to timestamptz (with timezone)
DO $$
BEGIN
  ALTER TABLE candles ALTER COLUMN timestamp TYPE TIMESTAMPTZ USING timestamp AT TIME ZONE 'UTC';
  ALTER TABLE candles ALTER COLUMN cached_at TYPE TIMESTAMPTZ USING cached_at AT TIME ZONE 'UTC';
EXCEPTION
  WHEN OTHERS THEN
    -- Columns might already be timestamptz
    NULL;
END $$;
