import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "../../blogs/entity/blogs.entity";
import { UserEntity } from "../../entity/user.entity";

@Entity("view")
export class ViewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  view_id!: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    nullable: false,
  })
  view_date!: Date;

  //! connection to post entity
  @ManyToOne(() => BlogEntity, (view_post) => view_post.blog_views, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  view_post!: BlogEntity;

  //! connection to user entity
  @ManyToOne(() => UserEntity, (views_user) => views_user.user_views, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  views_user!: UserEntity;
}