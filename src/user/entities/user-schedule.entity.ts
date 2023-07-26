import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from '@src/user/types/schedule.enum';
import { User } from '@src/user/entities/user.entity';

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
