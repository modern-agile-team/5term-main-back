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
import { LightningChatsService } from '../services/lightning-chats.service';
import { ParseObjectIdPipe } from '../parse-object-id.pipe';
import mongoose from 'mongoose';
import { CreateLightningChattingDto } from '../dtos/create-lightning-chattings.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('chats')
@Controller('lightning-chats')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class LightningChatsController {
  constructor(private readonly lightningChatsService: LightningChatsService) {}

  @Get()
  async getLightningChattingRooms() {
    return await this.lightningChatsService.getLightningChattingRooms(95);
  }

  @Post('lightning-boards/:boardId/authors/:authorId/users/:userId')
  async createLightningChattingRoom(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('authorId', ParseIntPipe)
    authorId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.lightningChatsService.createLightningChattingRooms(
      userId,
      authorId,
      boardId,
    );
  }

  @Get(':roomId')
  async getLightningChattings(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.lightningChatsService.getLightningChattings(roomId);
  }

  @Post('senders/:senderId/receivers/:receiverId')
  async createLightningChattings(
    @Param('senderId', ParseIntPipe) senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Body() createLightningChattingDto: CreateLightningChattingDto,
  ) {
    return await this.lightningChatsService.createLightningChattings(
      senderId,
      receiverId,
      createLightningChattingDto,
    );
  }

  @Delete(':roomId')
  async deleteLightningChattingRooms(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.lightningChatsService.deleteLightningChattingRooms(
      roomId,
    );
  }
}
