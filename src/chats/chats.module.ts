import {
  LightningChatting,
  LightningChattingSchema,
} from '@src/chats/schemas/lightning-chats.schema';
import { Module } from '@nestjs/common';
import { LightningChatsController } from '@src/chats/controllers/lightning-chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudyChatting,
  StudyChattingSchema,
} from '@src/chats/schemas/study-chats.schema';
import { StudyChatsService } from '@src/chats/services/study-chats.service';
import { LightningChatsService } from '@src/chats/services/lightning-chats.service';
import { StudyChatsController } from '@src/chats/controllers/study-chats.controller';
import {
  LightningChattingRoom,
  LightningChattingRoomSchema,
} from '@src/chats/schemas/lightning-chats-rooms.schema';
import {
  StudyChattingRoom,
  StudyChattingRoomSchema,
} from '@src/chats/schemas/study-chats-rooms.schema';
import { ParseObjectIdPipe } from '@src/chats/parse-object-id.pipe';
import { RedisModule } from '@src/common/redis/redis.module';
import { EventsModule } from '@src/events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightningChatting.name, schema: LightningChattingSchema },
      { name: StudyChatting.name, schema: StudyChattingSchema },
      { name: LightningChattingRoom.name, schema: LightningChattingRoomSchema },
      { name: StudyChattingRoom.name, schema: StudyChattingRoomSchema },
    ]),
    RedisModule,
    EventsModule,
  ],
  controllers: [LightningChatsController, StudyChatsController],
  providers: [LightningChatsService, StudyChatsService, ParseObjectIdPipe],
})
export class ChatsModule {}
