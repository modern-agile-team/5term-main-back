import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserImage extends CommonEntity {
  @Column({ name: 'img_url', nullable: true })
  imgUrl: string;

  @Column({ name: 'img_key', nullable: true })
  imgKey: string;

  @OneToOne(() => User, (userId: User) => userId.UserImage, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  userId: number;
}
