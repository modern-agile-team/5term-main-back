import { LightningService } from './../services/lightning.service';
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
@Controller('lightnings')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Post()
  create(@Body() Body) {
    return this.lightningService.createPost(Body);
  }
}
