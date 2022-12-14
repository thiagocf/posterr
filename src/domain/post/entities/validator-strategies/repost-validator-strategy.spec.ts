import { ID } from 'src/domain/base/value-objects/id';
import { ReferencedPostNotFoundException } from '../../exceptions/referenced-post-not-found.exception';
import { RepostMessageIsNotAllowedException } from '../../exceptions/repost-message-is-not-allowed.exception copy';
import { Message } from '../value-objects/message';
import { RepostValidatorStrategy } from './repost-validator-strategy';

describe('repost post type', () => {
  const strategy = new RepostValidatorStrategy();
  it('should not throw exceptions if there is a referenced post', () => {
    expect(strategy.validate(new ID())).toBeUndefined();
  });

  it('should throw error when the referenced post is not defined', () => {
    expect(() => strategy.validate()).toThrow(ReferencedPostNotFoundException);
  });

  it('should throw error when there is a defined message', () => {
    expect(() => strategy.validate(new ID(), new Message('Test'))).toThrow(
      RepostMessageIsNotAllowedException,
    );
  });
});
