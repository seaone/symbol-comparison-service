import { FastifySchema } from 'fastify';

export const compareSymbolsSchema: FastifySchema = {
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        result: { type: 'number' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
    500: {
      description: 'Internal server error',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};
