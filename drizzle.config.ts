// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' }); // Load environment variables

export default {
  schema: './schema.ts', // path to your schema file
  out: './drizzle', // migration output directory
  dialect: 'postgresql', // or 'pg' for PostgreSQL

  dbCredentials: {
    url: process.env.DATABASE_URL!, // your TimescaleDB URL
  },
} satisfies Config;

//
// postgresql://postgres:T3MBCkDC58STi4h9@db.poyahuwokoffxjhicwcw.supabase.co:5432/postgres
