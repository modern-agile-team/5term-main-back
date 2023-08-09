import { CommonEntity } from '@src/common/entities/common.entity';
import { User } from '@src/user/entities/user.entity';
import { Schedule } from '@src/user/types/schedule.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Study } from './study.entity';

@Entity({
  name: 'study_timetable',
})
export class StudyTimetable extends CommonEntity {
  @ManyToOne(() => Study)
  @JoinColumn({ name: 'study_id' })
  study: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @Column({ type: 'enum', name: 'schedule', enum: Schedule })
  schedule!: Schedule;

  @Column()
  content: string;
}
