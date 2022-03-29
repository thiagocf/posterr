import { ID } from 'src/domain/base/value-objects/id';
import { EmptyPostMessageException } from '../../exceptions/empty-post-message.exception';
import { ReferencedPostNotFoundException } from '../../exceptions/referenced-post-not-found.exception';
import { Message } from '../value-objects/message';
import { QuoteValidatorStrategy } from './quote-validator-strategy';

describe('quote post type', () => {
  const strategy = new QuoteValidatorStrategy();
  it('should not throw exceptions if there is a message and referenced post', () => {
    expect(
      strategy.validate(new ID(), new Message('Test message')),
    ).toBeUndefined();
  });

  it('should throw error when creating a quote post and the message is empty', () => {
    expect(() => strategy.validate(new ID(), new Message())).toThrow(
      EmptyPostMessageException,
    );
  });

  it('should throw error when creating a quote post and there is no referenced post', () => {
    expect(() =>
      strategy.validate(undefined, new Message('Test message')),
    ).toThrow(ReferencedPostNotFoundException);
  });
});
