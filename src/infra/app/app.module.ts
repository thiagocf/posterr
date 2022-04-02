import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { UserFollowLinkModule } from '../user-follow-link/user-follow-link.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [UserModule, PostModule, UserFollowLinkModule],
})
export class AppModule {}
