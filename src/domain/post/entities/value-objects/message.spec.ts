import { InvalidPostMessageLengthException } from '../../exceptions/invalid-post-message-length.exception';
import { Message } from './message';

describe('post message value object', () => {
  const BASE_TEXT =
    'Lorem ipsum dolor sit amet. Ut fugiat sapiente est assumenda libero id dolore doloremque eos reiciendis harum qui veritatis tenetur id debitis dolore sit dolor architecto. Eum vero minima in laudantium quis ab sunt tempore. Qui obcaecati neque aut neque praesentium aut expedita reprehenderit qui debitis mollitia et dolorum iste qui deleniti sint. Et magni internos et mollitia quibusdam qui iste repellendus et sunt sequi. Est dolorem temporibus ut optio veritatis et voluptas ipsa. Eos voluptatem tempora ut culpa ipsa a aliquam est veritatis earum. Ut recusandae vitae ut placeat consequatur et optio itaque in natus deleniti. Qui reiciendis tempora in laborum omnis quo unde alias. Et repellat dignissimos vel sunt perferendis nam tempora iusto. Est voluptates fugiat id accusamus cum libero accusamus.';

  it('should create message when the content length is less than 778 chars', () => {
    const text = BASE_TEXT.substring(0, 777);
    const sut = new Message(text);
    expect(sut.value).toBe(text);
  });

  it('should create empty message no content is provided', () => {
    const sut = new Message();
    expect(sut.value).toBe('');
  });

  it('should throw error when the content length is greater than 777 chars', () => {
    const text = BASE_TEXT.substring(0, 778);
    expect(() => new Message(text)).toThrow(InvalidPostMessageLengthException);
  });
});
