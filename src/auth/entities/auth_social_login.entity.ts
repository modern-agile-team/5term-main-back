import { User } from 'src/user/entities/user.entity';
import { UserProfile } from 'src/user/entities/user_profile.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuthSocialLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  access_token: string;

  @OneToOne((type) => User, (user) => user.id)
  user: User;
}
