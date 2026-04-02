import * as path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '../.env') });

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test-jwt-secret-for-ci-minimum-32-characters';
}
