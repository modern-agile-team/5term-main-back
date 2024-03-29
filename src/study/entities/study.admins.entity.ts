import { User } from '@src/user/entities/user.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Study } from '@src/study/entities/study.entity';

@Entity({
  name: 'study_admins',
})
export class StudyAdmins extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => Study, (study) => study.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'study_id' })
  study: Study;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
