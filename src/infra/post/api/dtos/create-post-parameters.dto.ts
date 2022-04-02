import { IsEnum, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { PostType } from 'src/domain/post/entities/post-type';

export class CreatePostDto {
  @IsEnum(PostType)
  type: PostType;

  @IsOptional()
  @MaxLength(777)
  message?: string;

  @IsOptional()
  @IsUUID()
  referencedPostId?: string;
}
