import type { FastifyInstance, FastifyRequest } from 'fastify';

async function routes(fastify: FastifyInstance) {
  fastify.get('/hello', async () => {
    return { message: 'Hello World' };
  });

  fastify.post('/data', async (request: FastifyRequest) => {
    const { body } = request;
    return { received: body };
  });
}

export default routes;
