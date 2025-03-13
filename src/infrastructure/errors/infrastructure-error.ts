import { BaseError } from '../../shared/error/base-error';

export class InfrastructureError extends BaseError {
  code = 'INFRASTRUCTURE_ERROR';
}
