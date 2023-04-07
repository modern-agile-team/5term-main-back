import { IsNotEmpty } from 'class-validator';
import { AuthPasswordLogin } from 'src/auth/entities/auth_password_login.entity';
import { AuthSocialLogin } from 'src/auth/entities/auth_social_login.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserProfile } from './user_profile.entity';
import { UserScheldule } from './user_schedule.entity';

@Entity()
export class User extends CommonEntity {
  @IsNotEmpty()
  @Column({ name: 'login_type' })
  loginType: number;

  @Column({ name: 'user_id' })
  userId: string;

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
