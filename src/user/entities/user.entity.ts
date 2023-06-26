import { AuthPasswordLogin } from 'src/auth/entities/auth_password_login.entity';
import { AuthSocialLogin } from 'src/auth/entities/auth_social_login.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { LightningBoardEntity } from 'src/lightning/entities/lightning-boards.entity';
import { LightningInfoEntity } from 'src/lightning/entities/lightning-info.entity';
import {
  Column,
  Entity,
  OneToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserProfile } from './user_profile.entity';
import { UserScheldule } from './user_schedule.entity';
import { LightningToUserEntity } from 'src/lightning/entities/lightning-to-user.entity';
import { StudyToUserEntity } from 'src/study/entities/study.to.user.entity';
import { StudyAdmins } from 'src/study/entities/study.admins.entity';
import { StudyRecruitBoardEntity } from 'src/study_recruit/entities/study_recruit_board.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ name: 'login_type' })
  loginType: number;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(
    () => LightningBoardEntity,
    (lightningBoard: LightningBoardEntity) => lightningBoard.author,
    {
      cascade: true,
    },
  )
  lightningBoard: LightningBoardEntity[];

  @OneToMany(
    () => LightningToUserEntity,
    (lightningToUser) => lightningToUser.user,
    {
      cascade: true,
    },
  )
  lightningToUser: LightningToUserEntity[];

  @OneToMany(() => StudyToUserEntity, (studyToUser) => studyToUser.user)
  studyToUser: StudyToUserEntity[];

  @OneToOne(() => AuthSocialLogin, (authSocialLogin) => authSocialLogin.user)
  authSocialLogin: AuthSocialLogin;

  @OneToOne(
    () => AuthPasswordLogin,
    (authPasswordLogin) => authPasswordLogin.user,
  )
  authPasswordLogin: AuthPasswordLogin;

  @OneToMany(() => UserScheldule, (userScheldule) => userScheldule.user)
  userScheldule: UserScheldule[];

  @OneToMany(() => StudyAdmins, (studyAdmin) => studyAdmin.user)
  studyAdmin: StudyAdmins[];

  @OneToMany(
    () => StudyRecruitBoardEntity,
    (StudyRecruitBoardEntity) => StudyRecruitBoardEntity.writer,
  )
  writer: StudyRecruitBoardEntity[];
}
