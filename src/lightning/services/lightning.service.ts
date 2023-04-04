import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
// import { CreateLightningInfoDto } from './../dtos/lightning-info.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LightningBoardEntity,
  LightningInfoEntity,
} from '../entities/lightning.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LightningService {
  constructor(
    @InjectRepository(LightningInfoEntity)
    private readonly ligntningRepository: Repository<LightningInfoEntity>, // private readonly configService: ConfigService,
  ) {}

  async createPost(active, meeting_date) {
    // const user = await this.ligntningRepository.findOne({ meeting_date });
    // if (user) {
    //   throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    // }

    await this.ligntningRepository.save({
      active,
      meeting_date,
    });

    return { success: true };
  }
}
