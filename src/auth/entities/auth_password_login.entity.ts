import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class AuthPasswordLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  password: string;
}
