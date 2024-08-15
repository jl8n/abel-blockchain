import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_HOST = process.env.PG_HOST;
const PG_DB = process.env.PG_DB;

export const config = {
  postgres: {
    connectionString: `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_DB}`,
  },
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
};
