import { BaseError } from '../../../shared/error/base-error';

export class DomainError extends BaseError {
  code = 'DOMAIN_ERROR';
}
