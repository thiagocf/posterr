import { AuthenticationService } from './authentication-service';

export class MockAuthenticationService implements AuthenticationService {
  getAuthenticatedUserId(): Promise<string> {
    return Promise.resolve('ea38bc9b-b770-4848-a736-9d44d5841641');
  }
}
