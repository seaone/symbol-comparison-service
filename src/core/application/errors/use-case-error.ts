import { BaseError } from '../../../shared/error/base-error';

export class UseCaseError extends BaseError {
  code = 'USE_CASE_ERROR';
}
