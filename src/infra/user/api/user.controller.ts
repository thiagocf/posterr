import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FindOneByIdUserRepository } from 'src/domain/user/repositories/user.repository';
import { USER_REPOSITORY } from '../repositories/user/constants';

type FindOneResponseDto = {
  id: string;
  username: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: FindOneByIdUserRepository,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOneResponseDto> {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException();
    return {
      createdAt: user.createdAt.toISOString(),
      followersCount: user.followersCount,
      followingCount: user.followingCount,
      id: user.id,
      postsCount: user.postsCount,
      username: user.username,
    };
  }
}
