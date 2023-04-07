import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Study } from './study.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class StudyAdmins extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => Study)
  @JoinColumn({ name: 'study_id' })
  study: Study;

  @ManyToMany((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
