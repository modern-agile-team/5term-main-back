import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuthSocialLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'access_token' })
  accessToken: string;

  @OneToOne(() => User, (user) => user.authSocialLogin)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
