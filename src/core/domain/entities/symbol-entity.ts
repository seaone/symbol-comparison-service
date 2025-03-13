import { DomainError } from '../errors/domain-error';

export class SymbolEntity {
  constructor(
    public readonly id: string,
    public readonly data: Buffer,
    public readonly name: string,
  ) {}

  validate() {
    if (this.data.length == 0) {
      throw new DomainError('SymbolEntity is invalid!');
    }
  }
}
