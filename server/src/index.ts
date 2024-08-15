import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyPostgres from '@fastify/postgres';
import routes from './routes';
import { config } from './config';

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyPostgres, {
  connectionString: config.postgres.connectionString,
});
fastify.register(cors, config.cors);
fastify.register(routes);


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();