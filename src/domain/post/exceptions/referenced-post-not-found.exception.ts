import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { REFERENCED_POST_NOT_FOUND_CODE } from './codes';

export class ReferencedPostNotFoundException extends BaseDomainException {
  constructor() {
    super('Referenced post not found.', REFERENCED_POST_NOT_FOUND_CODE);
  }
}
