import { FindOneById } from 'src/domain/base/repository-ports';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository extends FindOneById<string, UserEntity> {
  findOneById(id: string): Promise<UserEntity>;
}
