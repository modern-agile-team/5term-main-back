import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Study } from '../../study/entities/study.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'study_board',
})
export class StudyToolsBoards extends CommonEntity {
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

  @OneToMany(
    () => StudyToolsBoards,
    (studyToolsBoards) => studyToolsBoards.studyToolsBoards,
  )
  studyToolsBoards: StudyToolsBoards[];
}
