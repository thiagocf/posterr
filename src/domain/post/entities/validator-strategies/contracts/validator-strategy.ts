import { ReferencedPost } from '../../post.entity';

export interface ValidatorStrategy {
  validate(referencedPost?: ReferencedPost, message?: string);
}
