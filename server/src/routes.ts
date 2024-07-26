import type { FastifyInstance, FastifyRequest } from 'fastify';
import fs from 'node:fs/promises';

async function routes(fastify: FastifyInstance) {

  fastify.get('/api/data', async (_, reply) => {
    try {
      const data = await fs.readFile('mark.json', 'utf8');
      const jsonData = JSON.parse(data);
      reply.send(jsonData);
  } catch (err) {
    return reply.code(500).send({ error: 'Unable to read JSON file' });
  }
    //return { message: 'Hello World' };
  });

  fastify.post('/api/auth', async (request: FastifyRequest) => {
    const { body } = request;
    return { received: body };
  });
}

export default routes;
