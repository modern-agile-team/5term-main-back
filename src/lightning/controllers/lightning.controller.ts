import { LightningService } from './../services/lightning.service';
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CreateLightningInfoDto } from '../dtos/lightning-info.dto';

@Controller('lightnings')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Post(':id')
  create(@Body() createLightningInfoDto: CreateLightningInfoDto) {
    return this.lightningService.create(createLightningInfoDto);
  }
}
