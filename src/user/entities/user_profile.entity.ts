import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';
import { Sex } from '../type/user_profile.enum';

@Entity()
export class UserProfile extends CommonEntity {
  @Column()
  user_id: number;

  @Column()
  nickname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  birthday: number;

  @Column()
  sex: Sex;

  @Column()
  bio: string;
}
