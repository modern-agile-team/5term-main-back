import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { Body, Controller, ParseIntPipe, Get } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { CreateLightningBoardDto } from '../dtos/create-lightning-board.dto';
import {
  Param,
  Patch,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LightningRecruitmentService } from '../services/lightning-recruitment.service';

@ApiTags('lightning-recruitment')
@Controller('lightning-boards')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class LightningRecruitmentController {
  constructor(
    private readonly lightningRecruitService: LightningRecruitmentService,
  ) {}

  @ApiOperation({
    summary: '번개 모집글 작성',
  })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Post(':lightningId')
  async createLightningBoard(
    @Param('lightningId', ParseIntPipe)
    lightningId: number,
    @Body() createLightningBoardDto: CreateLightningBoardDto,
  ) {
    await this.lightningRecruitService.createLightningBoard(
      lightningId,
      createLightningBoardDto,
    );
    return { msg: '번개 모집글 생성 성공' };
  }

  @ApiOperation({
    summary: '번개 모집글 삭제',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Delete(':boardNo')
  async deleteLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    await this.lightningRecruitService.deleteLightningBoard(boardNo);
    return { msg: '번개 모집글 삭제 성공' };
  }

  @ApiOperation({
    summary: '번개 모집글 수정',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Patch(':boardNo')
  async updateLightningBoard(
    @Param('boardNo', ParseIntPipe) boardNo: number,
    @Body() updateLightningboardDto: UpdateLightningBoardDto,
  ) {
    await this.lightningRecruitService.updateLightningBoard(
      boardNo,
      updateLightningboardDto,
    );
    return { msg: '번개 모집글 수정 성공' };
  }

  @ApiOperation({
    summary: '번개 모집글 전부 조회',
  })
  @Get()
  async getAllLightningBoard() {
    const allBoards = await this.lightningRecruitService.getAllLightningBoard();
    return { msg: '번개 모집글 전부 조회 성공', response: { allBoards } };
  }

  @ApiOperation({
    summary: '번개 모집글 단일 조회',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Get(':boardNo')
  async getLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    const board = await this.lightningRecruitService.getLightningBoard(boardNo);
    return { msg: '번개 모집글 단일 조회 성공', response: { board } };
  }
}
