import { EmptyPostMessageException } from '../../exceptions/empty-post-message.exception';
import { Message } from '../value-objects/message';
import { NormalValidatorStrategy } from './normal-validator-strategy';

describe('normal post type', () => {
  const strategy = new NormalValidatorStrategy();
  it('should not throw exceptions if there is a message', () => {
    expect(
      strategy.validate(undefined, new Message('Test message')),
    ).toBeUndefined();
  });

  it('should throw error when creating a normal post and the message is empty', () => {
    expect(() => strategy.validate(undefined, new Message())).toThrow(
      EmptyPostMessageException,
    );
  });
});
