import { LightningInfoRepository } from './../repositories/lightning-info.repository';
import { Injectable } from '@nestjs/common';
import { CreateLightningDto } from '../dtos/lightning-info.dto';

@Injectable()
export class LightningService {
  constructor(
    private readonly lightningInfoRepository: LightningInfoRepository,
  ) {}

  async createLightningInfo(createLightningDto: CreateLightningDto) {
    const { meetingDate } = createLightningDto;

    await this.lightningInfoRepository.createLightning(meetingDate);
  }
}
