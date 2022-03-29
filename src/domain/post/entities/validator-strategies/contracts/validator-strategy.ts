import { ID } from 'src/domain/base/value-objects/id';
import { Message } from '../../value-objects/message';

export interface ValidatorStrategy {
  validate(referencedPostId?: ID, message?: Message);
}
