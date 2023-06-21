import {
  LightningChatting,
  LightningChattingSchema,
} from './schemas/lightning-chats.schema';
import { Module } from '@nestjs/common';
import { LightningChatsController } from './controllers/lightning-chats.controller';
import { StudyChatsController } from './controllers/study-chats.controller';
import { LightningChatsService } from './services/lightning-chats.service';
import { StudyChatsService } from './services/study-chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudyChatting, StudyChattingSchema } from './schemas/study.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightningChatting.name, schema: LightningChattingSchema },
      { name: StudyChatting.name, schema: StudyChattingSchema },
    ]),
  ],
  controllers: [LightningChatsController, StudyChatsController],
  providers: [LightningChatsService, StudyChatsService],
})
export class ChatsModule {}
