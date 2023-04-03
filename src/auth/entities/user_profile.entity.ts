import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_no: number;

  @Column()
  nickname: string;
}
