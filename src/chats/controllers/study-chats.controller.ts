import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyChatsService } from '../services/study-chats.service';
import { ParseObjectIdPipe } from '../parse-object-id.pipe';
import mongoose from 'mongoose';
import { CreateStuidyChattingDto } from '../dtos/create-study-chattings.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('chats')
@Controller('study-chats')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class StudyChatsController {
  constructor(private readonly studyChatsService: StudyChatsService) {}

  @Get()
  async getStudyChattingRooms() {
    return await this.studyChatsService.getStudyChattingRooms(95);
  }

  @Post('study-boards/:boardId/authors/:authorId/users/:userId')
  async createStudyChattingRoom(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('authorId', ParseIntPipe)
    authorId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.studyChatsService.createStudyChattingRooms(
      userId,
      authorId,
      boardId,
    );
  }

  @Get(':roomId')
  async getStudyChattings(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.studyChatsService.getStudyChattings(roomId);
  }

  @Post('senders/:senderId/receivers/:receiverId')
  async createStudyChattings(
    @Param('senderId', ParseIntPipe) senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Body() createStudyChattingDto: CreateStuidyChattingDto,
  ) {
    return await this.studyChatsService.createStudyChattings(
      senderId,
      receiverId,
      createStudyChattingDto,
    );
  }

  @Delete(':roomId')
  async deleteStudyChattingRooms(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.studyChatsService.deleteStudyChattingRooms(roomId);
  }
}
