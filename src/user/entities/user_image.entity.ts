import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserImage extends CommonEntity {
  @Column({ name: 'img_url' })
  imgUrl: string;

  @Column({ name: 'img_key' })
  imgKey: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
