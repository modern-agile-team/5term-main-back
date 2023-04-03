import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class AuthSocialLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  access_token: string;
}
