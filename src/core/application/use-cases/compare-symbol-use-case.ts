import { InfrastructureError } from '../../../infrastructure/errors/infrastructure-error.js';
import { SymbolEntity } from '../../domain/entities/symbol-entity.js';
import { SymbolComparisonService } from '../../domain/services/symbol-comparator.js';
import { CompareSymbolsDto } from '../dtos/compare-symbols-dto.js';
import { UseCaseError } from '../errors/use-case-error.js';

export class CompareSymbolsUseCase {
  constructor(private symbolComparator: SymbolComparisonService) {}

  async execute(symbols: CompareSymbolsDto): Promise<number> {
    const { symbol1, symbol2 } = symbols;
    const symbolEntity1 = new SymbolEntity(crypto.randomUUID(), symbol1.data, symbol1.name);
    const symbolEntity2 = new SymbolEntity(crypto.randomUUID(), symbol2.data, symbol2.name);

    symbolEntity1.validate();
    symbolEntity2.validate();

    try {
      return await this.symbolComparator.compare(symbolEntity1, symbolEntity2);
    } catch (error) {
      if (error instanceof InfrastructureError) {
        throw new UseCaseError('Failed to compare symbols', {
          cause: error,
        });
      }

      throw new UseCaseError('Unexpected error during comparing', {
        cause: error,
      });
    }
  }
}
