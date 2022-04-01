import { Module } from '@nestjs/common';
import { AUTHENTICATION_SERVICE } from './authentication/authentication-service';
import { MockAuthenticationService } from './authentication/mock-authentication-service';
@Module({
  providers: [
    {
      provide: AUTHENTICATION_SERVICE,
      useClass: MockAuthenticationService,
    },
  ],
  exports: [AUTHENTICATION_SERVICE],
})
export class AuthenticationModule {}
