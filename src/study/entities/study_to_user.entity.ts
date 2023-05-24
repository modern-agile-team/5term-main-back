import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Study } from './study.entity';

@Entity({
  name: 'study_to_user',
})
export class StudyToUserEntity extends CommonEntity {
  @ManyToOne(() => Study, (studyInfo) => studyInfo.studyToUser)
  @JoinColumn({
    name: 'study_id',
    referencedColumnName: 'id',
  })
  studyInfo: Study;

  @ManyToOne(() => User, (user) => user.studyToUser)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  //수락 대기중 = 0 수락 = 1 거절 = 2
  @Column({ name: 'is_accept', type: 'int', nullable: false, default: 0 })
  isAccept: number;
}
