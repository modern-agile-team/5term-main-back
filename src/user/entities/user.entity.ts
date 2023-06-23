import { IsNotEmpty } from 'class-validator';
import { AuthPasswordLogin } from 'src/auth/entities/auth_password_login.entity';
import { AuthSocialLogin } from 'src/auth/entities/auth_social_login.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { LightningBoardEntity } from 'src/lightning/entities/lightning-boards.entity';
import { Column, Entity, OneToOne, OneToMany } from 'typeorm';
import { UserProfile } from './user_profile.entity';
import { UserScheldule } from './user_schedule.entity';
import { LightningToUserEntity } from 'src/lightning/entities/lightning-to-user.entity';

@Entity()
export class User extends CommonEntity {
  @IsNotEmpty()
  @Column({ name: 'login_type' })
  loginType: number;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(
    () => LightningBoardEntity,
    (lightningBoard: LightningBoardEntity) => lightningBoard.authorId,
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

  @OneToOne(() => AuthSocialLogin, (authSocialLogin) => authSocialLogin.user)
  authSocialLogin: AuthSocialLogin;

  @OneToOne(
    () => AuthPasswordLogin,
    (authPasswordLogin) => authPasswordLogin.user,
  )
  authPasswordLogin: AuthPasswordLogin;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @OneToMany(() => UserScheldule, (userScheldule) => userScheldule.user)
  userScheldule: UserScheldule[];
}
