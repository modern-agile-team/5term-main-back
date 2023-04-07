import { User } from 'src/user/entities/user.entity';
import { BaseEntity, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { Study } from './study.entity';

@Entity()
export class StudyMembers extends BaseEntity {
  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Study)
  @JoinColumn({ name: 'study_id' })
  study: Study;
}
