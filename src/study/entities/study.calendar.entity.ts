import { CommonEntity } from '@src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@src/user/entities/user.entity';
import { Study } from './study.entity';

@Entity({
  name: 'study_calandar',
})
export class StudyCalendar extends CommonEntity {
  @ManyToOne(() => Study)
  @JoinColumn({ name: 'study_id' })
  study: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @Column()
  date: Date;

  @Column()
  content: string;
}
