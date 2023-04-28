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

@Controller('lightnings')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Post('/boards/:lightningNo')
  async createLightningBoard(
    @Param('lightningNo', ParseIntPipe) lightningNo: number,
    @Body() createLightningBoardDto: CreateLightningBoardDto,
  ) {
    return await this.lightningService.createLightningBoard(
      lightningNo,
      createLightningBoardDto,
    );
  }

  @Delete('/boards/:boardNo')
  async deleteLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    return await this.lightningService.deleteLightningBoard(boardNo);
  }

  @Patch('/boards/:boardNo')
  async updateLightningBoard(
    @Param('boardNo', ParseIntPipe) boardNo: number,
    @Body() updateLightningboardDto: UpdateLightningBoardDto,
  ) {
    return await this.lightningService.updateLightningBoard(
      boardNo,
      updateLightningboardDto,
    );
  }

  @Get('/boards/:boardNo')
  async getLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    return await this.lightningService.getLightningBoard(boardNo);
  }

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
