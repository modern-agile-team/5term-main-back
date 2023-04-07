import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Study extends CommonEntity {
  @Column()
  active: boolean;

  @Column()
  end_date: Date;
}
