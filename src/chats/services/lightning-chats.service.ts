import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LightningChatting } from '../schemas/lightning-chats.schema';
import mongoose, { Model } from 'mongoose';
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
    return await this.lightningChattingRoomModel
      .find({
        $or: [{ owner: userId }, { applicant: userId }],
      })
      .exec();
  }

  async createLightningChattingRooms(
    applicantId: number,
    authorId: number,
    boardId: number,
  ) {
    return await this.lightningChattingRoomModel.create({
      lightning_board_id: boardId,
      owner: authorId,
      applicant: applicantId,
    });
  }

  async getLightningChattings(roomId: mongoose.Types.ObjectId) {
    return await this.lightningChattingModel
      .find({ chatting_room_id: roomId })
      .exec();
  }
}
