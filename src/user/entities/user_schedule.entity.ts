import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../type/schedule.enum';

@Entity()
export class UserScheldule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  schedule: Schedule;
}
