import { Module } from '@nestjs/common';
import { PostController } from './api/post.controller';
import { UserPostController } from './api/user-post.controller';
import { POST_REPOSITORY } from './repositories/post/constants';
import { PgPostRepository } from './repositories/post/pg/pg-post-repository';

@Module({
  controllers: [UserPostController, PostController],
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: PgPostRepository,
    },
  ],
})
export class PostModule {}
