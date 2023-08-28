import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoomUserEntity } from './zoomuser.entity';

@Entity('zoom')
export class ZoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  zoomId!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  regsiter_date!: Date;

  @Column({
    nullable: false,
  })
  zoomMeetId!: string;

  @Column({
    nullable: true,
  })
  zoomMeetIsEnable!: string;

  @Column({
    nullable: true,
  })
  zoomMeetTopic!: string;

  @Column({
    nullable: false,
  })
  zoomMeetPassword!: string;

  @Column({
    nullable: true,
  })
  zoommeetdateandtime!: string;

  @Column({
    nullable: true,
  })
  zoommeetupcomingdate!: string;

  @Column({
    nullable: true,
  })
  zoom_Available_Slots!: number;

  @Column({
    nullable: false,
  })
  zoom_Total_Slots!: number;

  @Column({
    nullable: false,
  })
  zoommeetURL!: string;

  @OneToMany(() => ZoomUserEntity, (zoomusers) => zoomusers.zoomdt)
  zoomusers!: ZoomUserEntity[];
}
