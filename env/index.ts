import dotenv from 'dotenv';
import { cleanEnv, bool, str } from 'envalid';

dotenv.config({ path: '.env.example', quiet: true });
dotenv.config({ quiet: true }); 

/**
 * Validated environment variables
 * This ensures all required env vars are present and properly typed
 */
export const env = cleanEnv(process.env, {
  BASE_URL: str({ desc: 'Base URL for Catawiki application' }),
  CI: bool({ default: false, desc: 'Whether running in CI environment' }),
});
