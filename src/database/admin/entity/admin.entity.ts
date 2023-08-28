import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  admin_id!: number;

  @Column({
    nullable: false,
  })
  admin_email!: string;

  @Column({
    nullable: false,
  })
  admin_password!: string;
}
