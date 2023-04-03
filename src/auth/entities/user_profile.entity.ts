import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserProfile extends CommonEntity {
  @Column()
  user_no: number;

  @Column()
  nickname: string;
}
