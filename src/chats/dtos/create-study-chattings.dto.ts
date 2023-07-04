import { ApiProperty, PickType } from '@nestjs/swagger';
import { StudyChatting } from '../schemas/study-chats.schema';
import mongoose from 'mongoose';

export class CreateStuidyChattingDto extends PickType(StudyChatting, [
  'content',
] as const) {
  @ApiProperty({
    example: '649bdca04a3d51534f1415e9',
    description: '방 id 값',
    required: true,
  })
  roomId: mongoose.Types.ObjectId;
}
