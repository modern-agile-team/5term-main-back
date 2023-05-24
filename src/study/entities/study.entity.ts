import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { StudyToUserEntity } from './study_to_user.entity';

@Entity({
  name: 'study',
})
export class Study extends CommonEntity {
  @Column()
  active: boolean;

  @Column()
  end_date: Date;

  @OneToMany(() => StudyToUserEntity, (studyToUser) => studyToUser.studyInfo)
  studyToUser: StudyToUserEntity[];
}
