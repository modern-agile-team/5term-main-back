import { LightningService } from './../services/lightning.service';
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
// import { CreateLightningInfoDto } from '../dtos/lightning-info.dto';

@Controller('lightnings')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Post()
  create(@Body() Body) {
    const active = Boolean(Body.active);
    const meeting_date = Body.meeting_date;
    return this.lightningService.createPost(active, meeting_date);
  }
}
