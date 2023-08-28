import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { AudiobookchapterEntity } from "../../audio.chapter/entity/audiochapter.entity";

@Entity("audiobooks")
export class AudiobookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  audiobook_id!: string;

  @Column({
    nullable: false,
  })
  audiobook_title!: string;

  @Column({
    nullable: false,
  })
  audiobook_description!: string;

  @Column({
    nullable: false,
  })
  audiobook_imagecover!: string;

  @Column({
    nullable: false,
  })
  audiobook_author!: string;

  @Column({
    type: "date",
    nullable: true,
  })
  audiobook_date!: Date;

  @OneToMany(() => AudiobookchapterEntity, (audiochapter) => audiochapter.audiobooks)
  audiochapter!: AudiobookchapterEntity[];

}
