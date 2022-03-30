import { Module } from '@nestjs/common';
import { UserController } from './api/user.controller';
import { USER_REPOSITORY } from './repositories/user/constants';
import { PgUserRepository } from './repositories/user/pg/pg-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PgUserRepository,
    },
  ],
})
export class UserModule {}
