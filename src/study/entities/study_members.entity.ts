import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Study } from './study.entity';

@Entity({
  name: 'study_members',
})
export class StudyMembers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Study)
  @JoinColumn({ name: 'study_id' })
  study: Study;
}
