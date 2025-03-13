export interface SymbolComparatorPort {
  compare(symbolData1: Buffer, symbolData2: Buffer): Promise<number>;
}
