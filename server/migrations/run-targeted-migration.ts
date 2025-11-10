import { db } from '../db';
import { sql } from 'drizzle-orm';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  console.log('Running targeted migration: add_auth_security_columns');
  
  try {
    const migrationSQL = readFileSync(
      join(__dirname, '../../migrations/0001_add_auth_security_columns.sql'),
      'utf-8'
    );
    
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 60)}...`);
      await db.execute(sql.raw(statement));
    }
    
    console.log('✓ Migration completed successfully!');
    console.log('✓ Added 6 columns to clients table');
  } catch (error) {
    console.error('✗ Migration failed:', error);
    throw error;
  }
  
  process.exit(0);
}

runMigration().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
