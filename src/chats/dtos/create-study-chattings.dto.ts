import { PickType } from '@nestjs/swagger';
import { StudyChatting } from '../schemas/study-chats.schema';
import mongoose from 'mongoose';

export class CreateStuidyChattingDto extends PickType(StudyChatting, [
  'content',
] as const) {
  roomId: mongoose.Types.ObjectId;
}
