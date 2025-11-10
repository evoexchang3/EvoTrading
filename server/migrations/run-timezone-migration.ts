import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from '../db.js';
import { sql } from 'drizzle-orm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  console.log('Running timezone support migration...');
  
  try {
    const migrationSQL = readFileSync(
      join(__dirname, '0002_add_timezone_support.sql'),
      'utf-8'
    );
    
    // Execute the entire migration as a single transaction
    console.log('Applying schema changes...');
    await db.execute(sql.raw(migrationSQL));
    
    console.log('✓ Migration completed successfully!');
    console.log('Added columns:');
    console.log('  - symbols.exchange_timezone');
    console.log('  - symbols.trading_hours');
    console.log('  - user_preferences.timezone');
    console.log('  - user_preferences.auto_detect_timezone');
    console.log('  - candles.timestamp (converted to timestamptz)');
    console.log('  - candles.cached_at (converted to timestamptz)');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
