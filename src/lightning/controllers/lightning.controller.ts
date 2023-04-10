import { LightningService } from './../services/lightning.service';
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CreateLightningDto } from '../dtos/lightning-info.dto';
import { UseFilters, UseInterceptors } from '@nestjs/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('lightnings')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Post()
  async createLightningInfo(@Body() createLightningDto: CreateLightningDto) {
    return await this.lightningService.createLightningInfo(createLightningDto);
  }
}
