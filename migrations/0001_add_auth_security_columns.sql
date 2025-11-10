-- Add 2FA and password reset columns to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS two_factor_secret text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS two_factor_enabled boolean DEFAULT false NOT NULL;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS password_reset_token text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS password_reset_expires timestamp;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email_verification_token text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false NOT NULL;
