import { User } from 'src/user/entities/user.entity';

export class CreateLightningBoardDto {
  author: User;
  title: string;
  contents: string;
}
