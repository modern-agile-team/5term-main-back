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
import { UserScheldule } from './user_schedule.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ name: 'login_type' })
  loginType: number;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToMany(
    () => LightningInfoEntity,
    (lightningInfo: LightningInfoEntity) => lightningInfo.id,
    {
      cascade: true,
    },
  )
  @JoinTable({
    name: 'lightning_members',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'lightning_id',
      referencedColumnName: 'id',
    },
  })
  lightninginfo: LightningInfoEntity;
  @OneToMany(
    () => LightningBoardEntity,
    (lightningBoard: LightningBoardEntity) => lightningBoard.author,
    {
      cascade: true,
    },
  )
  lightningBoard: LightningBoardEntity[];

  @OneToOne(() => AuthSocialLogin, (authSocialLogin) => authSocialLogin.user)
  authSocialLogin: AuthSocialLogin;

  @OneToOne(
    () => AuthPasswordLogin,
    (authPasswordLogin) => authPasswordLogin.user,
  )
  authPasswordLogin: AuthPasswordLogin;

  @OneToMany(() => UserScheldule, (userScheldule) => userScheldule.user)
  userScheldule: UserScheldule[];
}