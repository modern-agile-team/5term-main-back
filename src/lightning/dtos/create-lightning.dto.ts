import { User } from 'src/user/entities/user.entity';

export class CreateLightningDto {
  author: User;
  title: string;
  contents: string;
  meetingDate: Date;
}
