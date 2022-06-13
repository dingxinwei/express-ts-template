import * as dotenv from 'dotenv';

dotenv.config();

export const { PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SERVER_HOST } = process.env;