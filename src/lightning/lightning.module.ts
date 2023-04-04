import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LightningController } from './controllers/lightning.controller';
import { LightningService } from './services/lightning.service';
import { LightningInfoEntity } from './entities/lightning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LightningInfoEntity])],
  controllers: [LightningController],
  providers: [LightningService],
})
export class LightningModule {}
