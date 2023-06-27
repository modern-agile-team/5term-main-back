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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({
    summary: '스터디 채팅방 전부 조회',
  })
  @Get()
  async getStudyChattingRooms() {
    return await this.studyChatsService.getStudyChattingRooms(95);
  }

  @ApiOperation({
    summary: '스터디 채팅방 생성',
  })
  @ApiParam({ name: 'boardId', example: '1', required: true })
  @ApiParam({ name: 'userId', example: '1', required: true })
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

  @ApiOperation({
    summary: '스터디 상세 채팅 조회',
  })
  @ApiParam({
    name: 'roomId',
    example: '649a4166c99212b8ccdb8fa1',
    required: true,
  })
  @Get(':roomId')
  async getStudyChattings(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.studyChatsService.getStudyChattings(roomId);
  }

  @ApiOperation({
    summary: '스터디 채팅 보내기',
  })
  @ApiParam({ name: 'senderId', example: '1', required: true })
  @ApiParam({ name: 'receiverId', example: '1', required: true })
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

  @ApiOperation({
    summary: '스터디 채팅방 나가기',
  })
  @ApiParam({
    name: 'rooomId',
    example: '649a4166c99212b8ccdb8fa1',
    required: true,
  })
  @Delete(':roomId')
  async deleteStudyChattingRooms(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.studyChatsService.deleteStudyChattingRooms(roomId);
  }
}
