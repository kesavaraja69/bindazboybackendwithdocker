import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../entity/user.entity";

@Entity("forgotpassword")
export class ForgotPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  forgotid!: string;

  @Column({
    nullable: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  otp!: string;

  @Column({
    nullable: true,
  })
  crt_date!: string;

  @Column({
    nullable: true,
  })
  exp_date!: string;

  @OneToOne(() => UserEntity, (user) => user.forgotpassword, )
  @JoinColumn()
  user!: UserEntity;
}
