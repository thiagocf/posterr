import { InvalidUsernameCharacterException } from '../exceptions/invalid-username-character.exception copy';
import { InvalidUsernameLengthException } from '../exceptions/invalid-username-length.exception';
import { Username } from './username';

describe('user username', () => {
  it('should create when username has length equal or less than 14', () => {
    const USERNAME = 'testUser';
    const sut = new Username(USERNAME);
    expect(sut.value).toBe(USERNAME);
  });

  it('should throw invalid character exception when username has non alphanumeric character', () => {
    const USERNAME = 'testUser@';
    try {
      new Username(USERNAME);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidUsernameCharacterException);
    }
  });

  it('should throw invalid length exception when username has length greater than 14', () => {
    const USERNAME = 'justALargetestUserName';
    try {
      new Username(USERNAME);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidUsernameLengthException);
    }
  });
});
