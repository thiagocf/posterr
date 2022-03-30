import { FindOneById } from 'src/domain/base/repository-ports';
import { UserEntity } from '../entities/user.entity';

export type FindOneByIdUserRepository = FindOneById<string, UserEntity>;
