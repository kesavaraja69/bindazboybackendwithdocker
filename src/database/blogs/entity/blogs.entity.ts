import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { BookmarkBlogEntity } from "../../bookmark/entity/bookmark.entity";
import { CatergoryEntity } from "../../category/entity/category.entity";
import { ViewsEntity } from "../../views/entity/view.entity";

@Entity("blogs")
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  blog_id!: string;

  @Column({
    nullable: false,
  })
  blog_title!: string;

  @Column({
    nullable: false,
  })
  blog_description!: string;

  @Column({
    nullable: false,
  })
  blog_image!: string;

  @Column({
    nullable: true,
  })
  blog_view!: string;

  @Column({
    nullable: false,
  })
  blog_category!: string;

  @Column({
    nullable: true,
  })
  blog_audio!: string;

  @Column({
    nullable:true,
    type:"simple-array"
  })
  blog_images!: string[];

  @Column({
    type: "date",
    nullable: true,
  })
  blog_date!: Date;

  @ManyToOne(() => CatergoryEntity, (catergorys) => catergorys.blogs)
  catergorys!: CatergoryEntity;

  @OneToMany(() =>BookmarkBlogEntity,(blog)=>blog.bookmark_blogdata)
  blog!:BookmarkBlogEntity;

  //! connection to view entity
  @OneToMany(() => ViewsEntity, (blog_views) => blog_views.view_post)
  @JoinColumn()
  blog_views!: ViewsEntity[];

}
