import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes';


const fastify = Fastify({
  logger: true
});


fastify.register(routes);
fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});


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