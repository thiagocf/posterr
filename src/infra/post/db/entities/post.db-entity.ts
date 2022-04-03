import { PostType } from 'src/domain/post/entities/post-type';
import { User } from 'src/infra/user/db/entities/user.db-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 777 })
  message: string;

  @Column({
    type: 'enum',
    enum: PostType,
  })
  type: PostType;

  @Column('timestamp')
  createdAt: Date;

  @Column('varchar', { length: 60, unique: true })
  dateIdCursor: string;

  @Column('uuid')
  authorId: string;

  @Column('uuid', { nullable: true })
  referencedPostId: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @OneToOne(() => Post)
  @JoinColumn()
  referencedPost: Post;
}
