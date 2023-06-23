import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LightningChatting } from '../schemas/lightning-chats.schema';
import { Model } from 'mongoose';
import { LightningChattingRoom } from '../schemas/lightning-chats-rooms.schema';

@Injectable()
export class LightningChatsService {
  constructor(
    @InjectModel(LightningChatting.name)
    private readonly lightningChattingModel: Model<LightningChatting>,
    @InjectModel(LightningChattingRoom.name)
    private readonly lightningChattingRoomModel: Model<LightningChattingRoom>,
  ) {}

  async getLightningChattingRooms(userId: number) {
    return await this.lightningChattingRoomModel.find({ userId: userId });
  }

  async createLightningChattingRooms(
    applicantId: number,
    authorId: number,
    boardId: number,
  ) {
    return await this.lightningChattingRoomModel.create({
      lightningBoardId: boardId,
      userId: { owner: authorId, applicant: applicantId },
    });
  }
}
