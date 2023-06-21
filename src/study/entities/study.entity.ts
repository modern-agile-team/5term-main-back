import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { StudyToUserEntity } from './study_to_user.entity';
import { StudyAdmins } from './study_admins.entity';
import { StudyRecruitBoard } from 'src/study_recruit/entities/study_recruit_board.entity';

@Entity({
  name: 'study',
})
export class Study extends CommonEntity {
  @Column()
  active: boolean;

  @Column()
  end_date: Date;

  @OneToMany(() => StudyToUserEntity, (studyToUser) => studyToUser.study)
  studyToUser: StudyToUserEntity[];

  @OneToOne(() => StudyAdmins, (studyAdmin) => studyAdmin.study)
  studyAdmin: StudyAdmins[];

  @OneToMany(
    () => StudyRecruitBoard,
    (studyRecruitBoard) => studyRecruitBoard.study,
  )
  studyRecruitBoard: StudyRecruitBoard[];
}
