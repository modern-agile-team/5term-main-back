import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LightningController } from './controllers/lightning.controller';
import { LightningService } from './services/lightning.service';
import { LightningInfoRepository } from './repositories/lightning-info.repository';
import { LightningBoardRepository } from './repositories/lightning_recruitment_boards.repository';
import { LightningToUserRepository } from './repositories/lightning-to-user.repository';
import { LightningRecruitmentService } from './services/lightning-recruitment.service';
import { LightningRecruitmentController } from './controllers/lightning-recruitment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LightningToUserRepository,
      LightningInfoRepository,
      LightningBoardRepository,
    ]),
  ],
  controllers: [LightningController, LightningRecruitmentController],
  providers: [LightningService, LightningRecruitmentService],
})
export class LightningModule {}
