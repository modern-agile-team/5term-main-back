import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserImage } from './user_image.entity';

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

  @OneToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @OneToOne(() => UserImage, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_img' })
  userImage: number;
}
