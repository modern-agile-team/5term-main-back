import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class User_image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  img_url: string;

  @Column()
  img_key: string;
}
