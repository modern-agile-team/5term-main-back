import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LightningController } from './controllers/lightning.controller';
import { LightningService } from './services/lightning.service';
import { LightningInfoEntity } from './entities/lightning-info.entity';
import { LightningInfoRepository } from './repositories/lightning-info.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LightningInfoEntity, LightningInfoRepository]),
  ],
  controllers: [LightningController],
  providers: [LightningService],
})
export class LightningModule {}
