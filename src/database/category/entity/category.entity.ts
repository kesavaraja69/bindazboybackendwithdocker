import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BlogEntity } from "../../blogs/entity/blogs.entity";

@Entity("catergory")
export class CatergoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  catergory_id!: string;

  @Column({
    nullable: false,
  })
  catergory_title!: string;

  @OneToMany(() => BlogEntity, (blogs) => blogs.catergorys)
  @JoinColumn()
  blogs!: BlogEntity[];
}
