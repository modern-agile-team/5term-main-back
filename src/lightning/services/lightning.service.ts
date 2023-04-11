import { LightningBoardRepository } from './../repositories/lightning_recruitment_boards.repository';
import { LightningInfoRepository } from './../repositories/lightning-info.repository';
import { Injectable } from '@nestjs/common';
import { CreateLightningDto } from '../dtos/lightning-info.dto';

@Injectable()
export class LightningService {
  constructor(
    private readonly lightningInfoRepository: LightningInfoRepository,
    private readonly lightningBoardRepository: LightningBoardRepository,
  ) {}

  async createLightning(createLightningDto: CreateLightningDto) {
    const { meetingDate } = createLightningDto;
    await this.lightningInfoRepository.createLightningInfo(meetingDate);
    const { title, contents, author } = createLightningDto;
    await this.lightningBoardRepository.createLightningBoard(
      title,
      contents,
      author,
    );
  }
}
