export const AUTHENTICATION_SERVICE = Symbol('AuthenticationService');

export interface AuthenticationService {
  getAuthenticatedUserId(): Promise<string>;
}
