import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CompareSymbolsRequest, SymbolComparisonController } from '../controllers/symbol-comparison-controller';
import { compareSymbolsSchema } from './symbol-comparison-schema';

export function symbolComparisonRoutes(fastify: FastifyInstance, controller: SymbolComparisonController): void {
  fastify.get('/', async (request, reply) => {
    reply.send({ result: 'Symbol Comparison Service is running' });
  });

  fastify.post(
    '/compare',
    { schema: compareSymbolsSchema },
    async (request: FastifyRequest<{ Body: CompareSymbolsRequest }>, reply: FastifyReply) => {
      await controller.compareSymbols(request, reply);
    },
  );
}
