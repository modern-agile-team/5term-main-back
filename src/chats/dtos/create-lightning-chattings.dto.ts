import { PickType } from '@nestjs/swagger';
import { LightningChatting } from '../schemas/lightning-chats.schema';
import mongoose from 'mongoose';

export class CreateLightningChattingDto extends PickType(LightningChatting, [
  'content',
] as const) {
  roomId: mongoose.Types.ObjectId;
}
