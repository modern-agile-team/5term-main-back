import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserImage } from './user-image.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  bio?: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_img' })
  userImageNo: number;

  @OneToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => UserImage, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_img' })
  userImage: UserImage;
}
