import { SymbolComparatorPort } from '../../ports/symbol-comparator-port.js';
import { SymbolEntity } from '../entities/symbol-entity.js';

export class SymbolComparisonService {
  constructor(private symbolComparator: SymbolComparatorPort) {}

  async compare(symbol1: SymbolEntity, symbol2: SymbolEntity): Promise<number> {
    return await this.symbolComparator.compare(symbol1.data, symbol2.data);
  }
}
