import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';
import { UserFollowLinkModule } from '../user-follow-link/user-follow-link.module';
import { UserModule } from '../user/user.module';
import { typeOrmModuleOptions } from './db/orm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...typeOrmModuleOptions,
      }),
    }),
    UserModule,
    PostModule,
    UserFollowLinkModule,
  ],
})
export class AppModule {}
