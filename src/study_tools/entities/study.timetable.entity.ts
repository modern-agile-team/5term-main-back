import { CommonEntity } from 'src/common/entities/common.entity';
import { Study } from 'src/study/entities/study.entity';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/user/type/schedule.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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
