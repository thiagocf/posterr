import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../common/authentication.module';
import { UserFollowLinkModule } from '../user-follow-link/user-follow-link.module';
import { PostController } from './api/post.controller';
import { UserPostController } from './api/user-post.controller';
import { POST_REPOSITORY } from './repositories/post/constants';
import { TypeormPostRepository } from './repositories/post/typeorm/typeorm-post-repository';

@Module({
  imports: [AuthenticationModule, UserFollowLinkModule],
  controllers: [UserPostController, PostController],
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: TypeormPostRepository,
    },
  ],
})
export class PostModule {}
