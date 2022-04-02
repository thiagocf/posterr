import { Module } from '@nestjs/common';
import { UserController } from './api/user.controller';
import { USER_REPOSITORY } from './repositories/user/constants';
import { TypeormUserRepository } from './repositories/user/typeorm/typeorm-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeormUserRepository,
    },
  ],
})
export class UserModule {}
