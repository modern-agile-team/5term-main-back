import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LightningChatsService } from '../services/lightning-chats.service';
import { ParseObjectIdPipe } from '../parse-object-id.pipe';
import mongoose from 'mongoose';
import { CreateLightningChattingDto } from '../dtos/create-lightning-chattings.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { JwtAccessGuard } from 'src/config/guards/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorators/getUserId.decorator';

@ApiTags('lightning-chats')
@Controller('lightning-chats')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@UseGuards(JwtAccessGuard)
export class LightningChatsController {
  constructor(private readonly lightningChatsService: LightningChatsService) {}

  @ApiOperation({
    summary: '번개 채팅방 전부 조회',
  })
  @Get()
  async getLightningChattingRooms(@GetUserId() userId: number) {
    return await this.lightningChatsService.getLightningChattingRooms(userId);
  }

  @ApiOperation({
    summary: '번개 채팅방 생성',
  })
  @ApiParam({ name: 'boardId', example: '1', required: true })
  @ApiParam({ name: 'userId', example: '1', required: true })
  @Post('lightning-boards/:boardId/authors/:authorId')
  async createLightningChattingRoom(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('authorId', ParseIntPipe)
    authorId: number,
    @GetUserId() userId: number,
  ) {
    return await this.lightningChatsService.createLightningChattingRooms(
      userId,
      authorId,
      boardId,
    );
  }

  @ApiOperation({
    summary: '번개 상세 채팅 조회',
  })
  @ApiParam({
    name: 'roomId',
    example: '649a4166c99212b8ccdb8fa1',
    required: true,
  })
  @Get(':roomId')
  async getLightningChattings(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.lightningChatsService.getLightningChattings(roomId);
  }

  @ApiOperation({
    summary: '번개 채팅 보내기',
  })
  @ApiParam({ name: 'senderId', example: '1', required: true })
  @ApiParam({ name: 'receiverId', example: '1', required: true })
  @Post('receivers/:receiverId')
  async createLightningChattings(
    @GetUserId() senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Body() createLightningChattingDto: CreateLightningChattingDto,
  ) {
    return await this.lightningChatsService.createLightningChattings(
      senderId,
      receiverId,
      createLightningChattingDto,
    );
  }

  @ApiOperation({
    summary: '번개 채팅방 나가기',
  })
  @ApiParam({
    name: 'rooomId',
    example: '649a4166c99212b8ccdb8fa1',
    required: true,
  })
  @Delete(':roomId')
  async deleteLightningChattingRooms(
    @Param('roomId', ParseObjectIdPipe) roomId: mongoose.Types.ObjectId,
  ) {
    return await this.lightningChatsService.deleteLightningChattingRooms(
      roomId,
    );
  }
}
