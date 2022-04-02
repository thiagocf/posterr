import { Post } from 'src/infra/post/db/entities/post.db-entity';
import { UserFollowLink } from 'src/infra/user-follow-link/db/entities/user-follow-link.db-entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column('timestamp')
  createdAt: Date;

  @Column('varchar', { length: 14 })
  username: string;

  @OneToMany(() => UserFollowLink, (link) => link.followerUser)
  following: UserFollowLink[];

  @OneToMany(() => UserFollowLink, (link) => link.followingUser)
  followers: UserFollowLink[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
