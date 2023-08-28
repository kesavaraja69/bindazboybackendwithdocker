import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AudiobookEntity } from "../../audiobooks/entity/audiobook.entity";

@Entity("audiobookschapter")
export class AudiobookchapterEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  audiobookchapter_id!: string;
  
  @Column({
    nullable: false,
  })
  audiobookchapter_title!: string;
  
  @Column({
    nullable: false,
  })
  audiobookchapter_description!: string;

  @Column({
    nullable: false,
  })
  audiobookchapter_audiourl!: string;

  @ManyToOne(() =>AudiobookEntity,(audiobooks)=>audiobooks.audiochapter)
  audiobooks!:AudiobookEntity;
}
