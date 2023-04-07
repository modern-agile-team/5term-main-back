import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from '../type/schedule.enum';
import { User } from './user.entity';

@Entity()
export class UserScheldule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schedule: Schedule;

  @ManyToOne(() => User, (user) => user.userScheldule)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
