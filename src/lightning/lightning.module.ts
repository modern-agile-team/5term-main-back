import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LightningController } from '@src/lightning/controllers/lightning.controller';
import { LightningService } from '@src/lightning/services/lightning.service';
import { LightningInfoRepository } from '@src/lightning/repositories/lightning-info.repository';
import { LightningBoardRepository } from '@src/lightning/repositories/lightning_recruitment_boards.repository';
import { LightningToUserRepository } from '@src/lightning/repositories/lightning-to-user.repository';
import { LightningRecruitmentService } from '@src/lightning/services/lightning-recruitment.service';
import { LightningRecruitmentController } from '@src/lightning/controllers/lightning-recruitment.controller';

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
