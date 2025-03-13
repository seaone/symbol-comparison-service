import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastify from 'fastify';
import { CompareSymbolsUseCase } from './core/application/use-cases/compare-symbol-use-case';
import { SymbolComparisonService } from './core/domain/services/symbol-comparator';
import { TensorflowSymbolComparator } from './infrastructure/tensorflow-symbol-comparator';
import { SymbolComparisonController } from './user-interface/controllers/symbol-comparison-controller';
import { symbolComparisonRoutes } from './user-interface/routes/symbol-comparison-route';

const port = 3001;
const fastifyInstance = fastify({ logger: true });

fastifyInstance.register(fastifyMultipart);
fastifyInstance.register(cors, {
  origin: 'http://localhost:3000', // Only allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify which methods to allow
});

async function startServer(): Promise<void> {
  const symbolComparator = new TensorflowSymbolComparator();
  const symbolComparisonService = new SymbolComparisonService(symbolComparator);
  const compareSymbolsUseCase = new CompareSymbolsUseCase(symbolComparisonService);
  const symbolComparisonController = new SymbolComparisonController(compareSymbolsUseCase);

  symbolComparisonRoutes(fastifyInstance, symbolComparisonController);

  try {
    await fastifyInstance.listen({
      port: port,
      host: '0.0.0.0',
    });
    console.log(`Server is listening on ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
