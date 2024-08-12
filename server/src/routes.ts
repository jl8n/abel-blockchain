import type { FastifyInstance } from 'fastify';
import fs from 'node:fs/promises';
import type { Metric } from '../../shared-types';

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

  fastify.post('/api/auth', async (request) => {
    const { body } = request;
    return { received: body };
  });

  fastify.put('/api/data', async (request, reply) => {
    try {
      const newMetrics = request.body as Metric[];

      // Validate input
      if (!Array.isArray(newMetrics)) {
        return reply.code(400).send({ error: 'Invalid input: expected an array of metrics' });
      }

      // Read the current data
      const data = await fs.readFile('mark.json', 'utf8');
      const jsonData = JSON.parse(data);

      // Replace the entire metrics array
      jsonData.metrics = newMetrics;

      // Write the updated data back to the file
      await fs.writeFile('mark.json', JSON.stringify(jsonData, null, 2));

      reply.send({ message: 'Metrics updated successfully', updatedMetrics: newMetrics });
    } catch (err) {
      console.error('Error updating metrics:', err);
      return reply.code(500).send({ error: 'Unable to update metrics' });
    }
  });

}

export default routes;
