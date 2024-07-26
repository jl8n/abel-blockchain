import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes';


const fastify = Fastify({
  logger: true
});


fastify.register(routes);
fastify.register(cors, {
  origin: true, // You can also specify a specific origin like 'http://localhost:8080'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
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