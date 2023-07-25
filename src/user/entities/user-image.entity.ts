import { CommonEntity } from '@src/common/entities/common.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '@src/user/entities/user.entity';

@Entity()
export class UserImage extends CommonEntity {
  @Column({ name: 'img_url', nullable: true })
  imgUrl: string;

  @Column({ name: 'img_key', nullable: true })
  imgKey: string;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (userId: User) => userId.userImage, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
