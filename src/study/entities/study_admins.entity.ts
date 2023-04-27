import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Study } from './study.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'study_admins',
})
export class StudyAdmins extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Study)
  @JoinColumn({ name: 'study_id' })
  studys: Study[];

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  users: User[];
}
