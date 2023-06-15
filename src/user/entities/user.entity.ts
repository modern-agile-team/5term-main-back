import { AuthPasswordLogin } from 'src/auth/entities/auth_password_login.entity';
import { AuthSocialLogin } from 'src/auth/entities/auth_social_login.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { LightningBoardEntity } from 'src/lightning/entities/lightning-boards.entity';
<<<<<<< HEAD
import { Column, Entity, OneToOne, OneToMany } from 'typeorm';
=======
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
>>>>>>> a0aa648179a5eb018781fcba48b59a192502cfeb
import { UserScheldule } from './user_schedule.entity';
import { LightningToUserEntity } from 'src/lightning/entities/lightning-to-user.entity';
import { StudyToUserEntity } from 'src/study/entities/study_to_user.entity';
import { StudyAdmins } from 'src/study/entities/study_admins.entity';
import { StudyRecruitBoard } from 'src/study_recruit/entities/study_recruit_board.entity';

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
<<<<<<< HEAD

  @OneToMany(() => StudyToUserEntity, (studyToUser) => studyToUser.user)
  studyToUser: StudyToUserEntity[];
=======
>>>>>>> a0aa648179a5eb018781fcba48b59a192502cfeb

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
    () => StudyRecruitBoard,
    (studyRecruitBoard) => studyRecruitBoard.writer,
  )
  writer: StudyRecruitBoard[];
}
