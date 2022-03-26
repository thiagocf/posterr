export class BaseException extends Error {
  constructor(message: string, private readonly code: string) {
    super(message);
  }
}
