import { CommonEntity } from '@src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '@src/user/entities/user.entity';
import { Study } from './study.entity';
import { StudyToolsBoardsImg } from './study.tools.boardIMG.entity';

@Entity({
  name: 'study_tools_board',
})
export class StudyToolsBoards extends CommonEntity {
  @ManyToOne((type) => Study)
  @JoinColumn({ name: 'study_id' })
  study: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(
    () => StudyToolsBoardsImg,
    (studyToolsBoardsImg) => studyToolsBoardsImg.studyToolsBoards,
  )
  studyToolsBoardsImg: StudyToolsBoardsImg[];
}
