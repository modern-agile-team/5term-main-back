import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { LightningService } from './../services/lightning.service';
import { Body, Controller, ParseIntPipe } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { CreateLightningDto } from '../dtos/create-lightning-board.dto';
import {
  Param,
  Patch,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('lightnings')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Post()
  async createLightning(@Body() createLightningDto: CreateLightningDto) {
    return await this.lightningService.createLightning(createLightningDto);
  }

  @Delete(':boardNo')
  async deleteLightningBoard(@Param('boardNo', ParseIntPipe) boardNo: number) {
    return await this.lightningService.deleteLightningBoard(boardNo);
  }

  @Patch(':boardNo')
  async updateLightningBoard(
    @Param('boardNo', ParseIntPipe) boardNo: number,
    @Body() updateLightningboardDto: UpdateLightningBoardDto,
  ) {
    return await this.lightningService.updateLightningBoard(
      boardNo,
      updateLightningboardDto,
    );
  }
}
