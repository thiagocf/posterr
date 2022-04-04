import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { FindOneByIdUserRepository } from 'src/domain/user/repositories/user.repository';
import { User } from 'src/infra/user/db/entities/user.db-entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class TypeormUserRepository implements FindOneByIdUserRepository {
  constructor(private readonly manager: EntityManager) {}
  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .loadRelationCountAndMap('user.followingCount', 'user.following')
      .loadRelationCountAndMap('user.followersCount', 'user.followers')
      .loadRelationCountAndMap('user.postsCount', 'user.posts')
      .getOne();

    if (!user) return;
    return new UserEntity(user);
  }
}
