import { InfrastructureError } from './infrastructure-error';

export class TensorflowSymbolComparatorError extends InfrastructureError {
  code = 'COMPARE_ERROR';
}
