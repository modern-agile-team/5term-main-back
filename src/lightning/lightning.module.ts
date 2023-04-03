import { Module } from '@nestjs/common';
import { LightningController } from './controllers/lightning.controller';
import { LightningService } from './services/lightning.service';

@Module({
  controllers: [LightningController],
  providers: [LightningService],
})
export class LightningModule {}
