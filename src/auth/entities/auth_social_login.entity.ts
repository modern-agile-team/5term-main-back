import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class AuthSocialLogin extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'access_token' })
  accessToken: string;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user) => user.authSocialLogin, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
