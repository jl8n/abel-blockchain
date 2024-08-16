import dotenv from 'dotenv';

dotenv.config(); // load environment variables

const { PG_USER, PG_PASSWORD, PG_HOST, PG_DB, CORS_DOMAINS } = process.env;

export const config = {
  postgres: {
    connectionString: `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_DB}`,
  },
  cors: {
    origin: CORS_DOMAINS ? CORS_DOMAINS.split(',') : false,  // get list of domains from env
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
};
