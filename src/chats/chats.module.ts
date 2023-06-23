import {
  LightningChatting,
  LightningChattingSchema,
} from './schemas/lightning-chats.schema';
import { Module } from '@nestjs/common';
import { LightningChatsController } from './controllers/lightning-chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudyChatting,
  StudyChattingSchema,
} from './schemas/study-chats.schema';
import { StudyChatsService } from './services/study-chats.service';
import { LightningChatsService } from './services/lightning-chats.service';
import { StudyChatsController } from './controllers/study-chats.controller';
import {
  LightningChattingRoom,
  LightningChattingRoomSchema,
} from './schemas/lightning-chats-rooms.schema';
import {
  StudyChattingRoom,
  StudyChattingRoomSchema,
} from './schemas/study-chats-rooms.schema';
import { ParseObjectIdPipe } from './parse-object-id.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightningChatting.name, schema: LightningChattingSchema },
      { name: StudyChatting.name, schema: StudyChattingSchema },
      { name: LightningChattingRoom.name, schema: LightningChattingRoomSchema },
      { name: StudyChattingRoom.name, schema: StudyChattingRoomSchema },
    ]),
  ],
  controllers: [LightningChatsController, StudyChatsController],
  providers: [LightningChatsService, StudyChatsService, ParseObjectIdPipe],
})
export class ChatsModule {}
