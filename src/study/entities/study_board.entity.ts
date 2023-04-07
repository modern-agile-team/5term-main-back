import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Study } from './study.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class StudyBoard extends CommonEntity {
  @ManyToOne((type) => Study)
  @JoinColumn({ name: 'study_id' })
  study: Study;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @Column()
  title: string;

  @Column()
  content: string;
}
