import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';
import { UserFollowLinkModule } from '../user-follow-link/user-follow-link.module';
import { UserModule } from '../user/user.module';
import { createOptions } from './db/orm.config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createOptions(configService),
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    UserFollowLinkModule,
  ],
})
export class AppModule {}
