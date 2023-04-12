import { LightningService } from './../services/lightning.service';
import { Body, Controller } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { CreateLightningDto } from '../dtos/create-lightning.dto';
import { Param, UseFilters, UseInterceptors } from '@nestjs/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { DeleteLightningDto } from '../dtos/delete-lightning-board.dto';

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
  async deleteLightningBoard(
    @Param() deleteLightningBoardDto: DeleteLightningDto,
  ) {
    return await this.lightningService.deleteLightningBoard(
      deleteLightningBoardDto,
    );
  }
}
