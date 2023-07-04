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
import { StudyRecruitBoard } from 'src/study_recruit/entities/study_recruit_board.entity';
import { UserImage } from './user_image.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ name: 'login_type' })
  loginType: number;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(
    () => LightningBoardEntity,
    (lightningBoard: LightningBoardEntity) => lightningBoard.author_id,
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
    (authPasswordLogin) => authPasswordLogin.userId,
    { cascade: true },
  )
  authPasswordLogin: AuthPasswordLogin;

  @OneToMany(() => UserScheldule, (userScheldule) => userScheldule.user)
  userScheldule: UserScheldule[];

  @OneToMany(() => StudyAdmins, (studyAdmin) => studyAdmin.user)
  studyAdmin: StudyAdmins[];

  @OneToMany(
    () => StudyRecruitBoard,
    (studyRecruitBoard) => studyRecruitBoard.writer,
  )
  writer: StudyRecruitBoard[];

  @OneToOne(() => UserImage, (userImage) => userImage.userId, {
    cascade: true,
  })
  UserImage: UserImage;
}
