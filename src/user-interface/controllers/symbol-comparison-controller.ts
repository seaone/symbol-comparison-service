import { MultipartFile } from '@fastify/multipart';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CompareSymbolsDto } from '../../core/application/dtos/compare-symbols-dto';
import { CompareSymbolsUseCase } from '../../core/application/use-cases/compare-symbol-use-case';
import { ErrorHandler } from '../../shared/error/error-handler';

export interface CompareSymbolsRequest {
  originalImage: MultipartFile;
  canvasImage: MultipartFile;
}

export class SymbolComparisonController {
  constructor(private readonly compareSymbolUseCase: CompareSymbolsUseCase) {}

  async compareSymbols(request: FastifyRequest<{ Body: CompareSymbolsRequest }>, reply: FastifyReply): Promise<void> {
    try {
      const dto = await this.toDto(request.files());

      if (!dto.symbol1.data || !dto.symbol2.data) {
        reply.code(400).send({ error: 'Both originalImage and canvasImage are required' });
        return;
      }

      reply.code(200).send({
        result: await this.compareSymbolUseCase.execute(dto),
      });
    } catch (error) {
      reply.code(500).send({ error: ErrorHandler.handle(error) });
    }
  }

  private async toDto(files: AsyncIterableIterator<MultipartFile>): Promise<CompareSymbolsDto> {
    const multipartFiles = await Array.fromAsync(files);
    const buffers: Buffer[] = [];

    for (const file of multipartFiles) {
      const buffer = await file.toBuffer();
      buffers.push(buffer);
    }

    return {
      symbol1: {
        data: buffers[0],
        name: multipartFiles[0].filename,
      },
      symbol2: {
        data: buffers[1],
        name: multipartFiles[1].filename,
      },
    };
  }
}
