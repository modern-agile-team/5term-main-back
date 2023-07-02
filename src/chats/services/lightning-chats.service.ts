import { CreateLightningChattingDto } from './../dtos/create-lightning-chattings.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LightningChatting } from '../schemas/lightning-chats.schema';
import mongoose, { Model } from 'mongoose';
import { LightningChattingRoom } from '../schemas/lightning-chats-rooms.schema';
import { v4 as uuidv4 } from 'uuid';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class LightningChatsService {
  constructor(
    @InjectModel(LightningChatting.name)
    private readonly lightningChattingModel: Model<LightningChatting>,
    @InjectModel(LightningChattingRoom.name)
    private readonly lightningChattingRoomModel: Model<LightningChattingRoom>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getLightningChattingRooms(userId: number) {
    return await this.lightningChattingRoomModel
      .find({
        $and: [
          { $or: [{ owner: userId }, { applicant: userId }] },
          { deletedAt: null },
        ],
      })
      .exec();
  }

  async createLightningChattingRooms(
    applicantId: number,
    authorId: number,
    boardId: number,
  ) {
    const roomId = uuidv4();
    return await this.lightningChattingRoomModel.create({
      lightning_board_id: boardId,
      owner: authorId,
      applicant: applicantId,
      roomId: roomId,
    });
  }

  async getLightningChattings(roomId: mongoose.Types.ObjectId) {
    return await this.lightningChattingModel
      .find({ chatting_room_id: roomId })
      .exec();
  }

  async createLightningChattings(
    senderId: number,
    receiverId: number,
    createLightningChattingDto: CreateLightningChattingDto,
  ) {
    const { content, roomId } = createLightningChattingDto;
    const roomObjectId = new mongoose.Types.ObjectId(roomId);
    const getRoomId = await this.lightningChattingRoomModel
      .find({
        $and: [{ _id: roomObjectId }, { deletedAt: null }],
      })
      .select('roomId');
    const socketRoomId = getRoomId[0].roomId;
    const resource = await this.lightningChattingModel.create({
      sender: senderId,
      receiver: receiverId,
      chatting_room_id: roomObjectId,
      content: content,
    });
    const message = {
      sender: resource.sender,
      receiver: resource.receiver,
      content: resource.content,
    };

    this.eventsGateway.server.to(socketRoomId).emit('newChat', message);

    return resource;
  }

  async deleteLightningChattingRooms(roomId: mongoose.Types.ObjectId) {
    return await this.lightningChattingRoomModel.findByIdAndUpdate(roomId, {
      deletedAt: new Date(),
    });
  }
}
