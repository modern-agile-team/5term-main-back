import { StudyChatting } from './../schemas/study-chats.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { StudyChattingRoom } from '../schemas/study-chats-rooms.schema';
import { CreateStuidyChattingDto } from '../dtos/create-study-chattings.dto';
import { v4 as uuidv4 } from 'uuid';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class StudyChatsService {
  constructor(
    @InjectModel(StudyChatting.name)
    private readonly studyChattingModel: Model<StudyChatting>,
    @InjectModel(StudyChattingRoom.name)
    private readonly studyChattingRoomModel: Model<StudyChattingRoom>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getStudyChattingRooms(userId: number) {
    return await this.studyChattingRoomModel
      .find({
        $and: [
          { $or: [{ owner: userId }, { applicant: userId }] },
          { deletedAt: null },
        ],
      })
      .exec();
  }

  async createStudyChattingRooms(
    applicantId: number,
    authorId: number,
    boardId: number,
  ) {
    const roomId = uuidv4();
    return await this.studyChattingRoomModel.create({
      study_board_id: boardId,
      owner: authorId,
      applicant: applicantId,
      roomId: roomId,
    });
  }

  async getStudyChattings(roomId: mongoose.Types.ObjectId) {
    return await this.studyChattingModel
      .find({ chatting_room_id: roomId })
      .exec();
  }

  async createStudyChattings(
    senderId: number,
    receiverId: number,
    createStudyChattingDto: CreateStuidyChattingDto,
  ) {
    const { content, roomId } = createStudyChattingDto;
    const roomObjectId = new mongoose.Types.ObjectId(roomId);
    const getRoomId = await this.studyChattingRoomModel
      .find({
        $and: [{ _id: roomObjectId }, { deletedAt: null }],
      })
      .select('roomId');
    const socketRoomId = getRoomId[0].roomId;
    const resource = await this.studyChattingModel.create({
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

  async deleteStudyChattingRooms(roomId: mongoose.Types.ObjectId) {
    return await this.studyChattingRoomModel.findByIdAndUpdate(roomId, {
      deletedAt: new Date(),
    });
  }
}
