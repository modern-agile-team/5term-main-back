import { CommonEntity } from 'src/common/entities/common.entity';
import { Study } from 'src/study/entities/study.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'study_timetable',
})
export class StudyTimetable extends CommonEntity {
  @ManyToOne(() => Study)
  @JoinColumn({ name: 'study_id' })
  study: Study;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @Column()
  day: string;

  @Column()
  time: string;

  @Column()
  content: string;
}
