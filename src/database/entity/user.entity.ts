import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookmarkBlogEntity } from "../bookmark/entity/bookmark.entity";
import { ContactusEntity } from "../contactus/enitiy/contactus.entity";
import { ForgotPasswordEntity } from "../forgotpassword/entity/forgotpassword.entity";
import { ViewsEntity } from "../views/entity/view.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    nullable: false,
  })
  useremail!: string;

  @Column({
    nullable: true,
  })
  username!: string;

  @Column({
    nullable: false,
  })
  userpassword!: string;

  @OneToOne(() => ForgotPasswordEntity, (forgotpassword) => forgotpassword.user)
  forgotpassword!: ForgotPasswordEntity;

  //! User bookmarks/Saved
  @OneToMany(
    () => BookmarkBlogEntity,
    (user_bookmarks) => user_bookmarks.bookmark_user
  )
  user_bookmarks!: BookmarkBlogEntity;

  //! connect to view entity
  @OneToMany(() => ViewsEntity, (user_views) => user_views.views_user)
  @JoinColumn()
  user_views!: ViewsEntity[];

  //! connect to contactus
  @OneToMany(() => ContactusEntity, (contactus) => contactus.log_user)
  @JoinColumn()
  contactus!: ContactusEntity[];
}
