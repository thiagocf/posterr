import { ID } from './id';

describe('user id', () => {
  it('should create random value when no id is provided', () => {
    const sut = new ID();
    expect(sut.value).toBeDefined();
  });

  it('should create when a id is provided', () => {
    const id = 'abcd';
    const sut = new ID(id);
    expect(sut.value).toBe(id);
  });
});
