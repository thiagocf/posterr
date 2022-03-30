import { UserEntity } from 'src/domain/user/entities/user.entity';
import { FindOneByIdUserRepository } from 'src/domain/user/repositories/user.repository';

export class PgUserRepository implements FindOneByIdUserRepository {
  findOneById(id: string): Promise<UserEntity> {
    return Promise.resolve(
      new UserEntity({
        id,
        username: 'MockUsername',
      }),
    );
  }
}
