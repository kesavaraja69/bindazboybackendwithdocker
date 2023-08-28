import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoomEntity } from './zoom.entity';

@Entity('userzoom')
export class ZoomUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  zoomUserId!: number;

  @Column({
    nullable: true,
  })
  user_date!: string;

  @Column({
    nullable: false,
  })
  zoomMeetUser!: string;

  @Column({
    nullable: false,
  })
  zoomMeetUserEmail!: string;

  @ManyToOne(() => ZoomEntity, (zoomdt) => zoomdt.zoomusers)
  @JoinColumn()
  zoomdt!: ZoomEntity;
}
