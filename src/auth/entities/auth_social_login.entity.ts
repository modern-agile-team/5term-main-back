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
  id: string;

  @Column({ name: 'access_token' })
  accessToken: string;

  @OneToOne(() => User, (user) => user.authSocialLogin, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
