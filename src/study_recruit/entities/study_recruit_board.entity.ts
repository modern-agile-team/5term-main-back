import { CommonEntity } from 'src/common/entities/common.entity';
import { Study } from 'src/study/entities/study.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'study_recruit_board',
})
export class StudyRecruitBoard extends CommonEntity {
  @ManyToOne(() => Study, (study) => study.studyRecruitBoard)
  @JoinColumn({ name: 'study_id' })
  study: Study;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  contents: string;

  @OneToMany(
    () => StudyRecruitBoard,
    (studyRecruitBoard) => studyRecruitBoard.studyRecruitBoardImg,
  )
  studyRecruitBoardImg: StudyRecruitBoard[];
}
