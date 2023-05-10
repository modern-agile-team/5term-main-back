import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { LightningService } from './../services/lightning.service';
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
import { CreateLightningInfoDto } from '../dtos/create-lightning-info.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('lightning')
@Controller('lightnings')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @ApiOperation({
    summary: '번개 모집글 작성',
  })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Post('/boards/:lightningNo')
  async createLightningBoard(
    @Param('lightningNo', ParseIntPipe)
    lightningNo: number,
    @Body() createLightningBoardDto: CreateLightningBoardDto,
  ) {
    await this.lightningService.createLightningBoard(
      lightningNo,
      createLightningBoardDto,
    );
    return { msg: '번개 모집글 생성 성공' };
  }

  @ApiOperation({
    summary: '번개 모집글 삭제',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Delete('/boards/:boardNo')
  async deleteLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    await this.lightningService.deleteLightningBoard(boardNo);
    return { msg: '번개 모집글 삭제 성공' };
  }

  @ApiOperation({
    summary: '번개 모집글 수정',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Patch('/boards/:boardNo')
  async updateLightningBoard(
    @Param('boardNo', ParseIntPipe) boardNo: number,
    @Body() updateLightningboardDto: UpdateLightningBoardDto,
  ) {
    await this.lightningService.updateLightningBoard(
      boardNo,
      updateLightningboardDto,
    );
    return { msg: '번개 모집글 수정 성공' };
  }

  @ApiOperation({
    summary: '번개 모집글 단일 조회',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Get('/boards/:boardNo')
  async getLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    const board = await this.lightningService.getLightningBoard(boardNo);
    return { msg: '번개 모집글 단일 조회 성공', response: { board } };
  }

  @ApiOperation({
    summary: '번개 모집글 전부 조회',
  })
  @ApiParam({ name: 'boardNo', example: '1', required: true })
  @Get('/all-boards')
  async getAllLightningBoard() {
    const allBoards = await this.lightningService.getAllLightningBoard();
    return { msg: '번개 모집글 전부 조회 성공', response: { allBoards } };
  }

  @ApiOperation({
    summary: '번개 모임 생성',
  })
  @Post('/:userNo')
  async createLightningInfo(
    @Param('userNo', ParseIntPipe) userNo: number,
    @Body() createLightninginfoDto: CreateLightningInfoDto,
  ) {
    return await this.lightningService.createLightningInfo(
      createLightninginfoDto,
      userNo,
    );
  }
}
