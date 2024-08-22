import { z } from 'zod';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../', '.env') });

export const envSchema = z.object({
  EXAMPLE_ENV_VAR_WITH_DEFAULT: z.string().default('example_env_default_value'),
  EXAMPLE_ENV_VAR: z.string(),
});
