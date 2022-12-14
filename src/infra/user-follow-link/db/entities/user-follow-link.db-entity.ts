import { User } from 'src/infra/user/db/entities/user.db-entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['followerUser', 'followingUser'], { unique: true })
export class UserFollowLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.followers)
  followerUser: User;

  @ManyToOne(() => User, (user) => user.following)
  followingUser: User;

  @Column('uuid')
  followerUserId: string;

  @Column('uuid')
  followingUserId: string;
}
