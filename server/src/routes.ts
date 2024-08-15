import type { FastifyInstance } from 'fastify';
import type { Metric } from '../../shared-types';

async function routes(fastify: FastifyInstance) {

  fastify.get('/api/data', async (_, reply) => {
    try {
      const { rows: [mark] } = await fastify.pg.query('SELECT * FROM mark');
      const { rows: metrics } = await fastify.pg.query('SELECT * FROM metrics');
      
      const response = {
        title: mark.title,
        firstname: mark.firstname,
        lastname: mark.lastname,
        metrics: metrics
      };
      
      reply.send(response);
    } catch (err) {
      console.error('Error fetching data:', err);
      return reply.code(500).send({ error: 'Unable to fetch data from database' });
    }
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

    // Delete existing metrics and insert new ones
    const values = newMetrics
      .map((metric, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`)
      .join(', ');

    const queryText = `
      BEGIN;
      DELETE FROM metrics;
      INSERT INTO metrics (field1, field2, field3) VALUES ${values};
      COMMIT;
    `;

    const queryParams = newMetrics.flatMap(metric => [metric.id, metric.name, metric.value]);

    await fastify.pg.query(queryText, queryParams);

    reply.send({ message: 'Metrics updated successfully', updatedMetrics: newMetrics });
    } catch (err) {
      console.error('Error updating metrics:', err);

      // Rollback transaction in case of an error
      await fastify.pg.query('ROLLBACK');

      return reply.code(500).send({ error: 'Unable to update metrics' });
    }
  });

}

export default routes;
