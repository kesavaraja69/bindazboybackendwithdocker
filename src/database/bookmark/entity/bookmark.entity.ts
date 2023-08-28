import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BlogEntity } from "../../blogs/entity/blogs.entity";
import { UserEntity } from "../../entity/user.entity";

@Entity("bookmark_blog")
export class BookmarkBlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  bookmark_id!: number;

  @ManyToOne(() => BlogEntity,(bookmark_blogdata) => bookmark_blogdata.blog)
  @JoinColumn()
  bookmark_blogdata!: BlogEntity;

  @ManyToOne(() => UserEntity, (bookmark_user) => bookmark_user.user_bookmarks)
  @JoinColumn()
  bookmark_user!: UserEntity;
}
