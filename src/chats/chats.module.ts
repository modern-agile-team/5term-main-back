import {
  LightningChatting,
  LightningChattingSchema,
} from './schemas/lightning-chats.schema';
import { Module } from '@nestjs/common';
import { LightningChatsController } from './controllers/chats.controller';
import { LightningChatsService } from './services/chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudyChatting, StudyChattingSchema } from './schemas/study.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightningChatting.name, schema: LightningChattingSchema },
      { name: StudyChatting.name, schema: StudyChattingSchema },
    ]),
  ],
  controllers: [LightningChatsController],
  providers: [LightningChatsService],
})
export class ChatsModule {}
