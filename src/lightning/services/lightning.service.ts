import { Repository } from 'typeorm';
// import { CreateLightningInfoDto } from './../dtos/lightning-info.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LightningInfoEntity } from '../entities/lightning-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LightningBoardEntity } from '../entities/lightning-boards.entity';

@Injectable()
export class LightningService {
  constructor(
    @InjectRepository(LightningInfoEntity)
    private readonly ligntningRepository: Repository<LightningInfoEntity>, // private readonly configService: ConfigService,
  ) {}

  async createPost(createLightningDto: CreateLightningDto) {
    // const { meeting_date } = createLightningDto;
    // // const meeting = await this.ligntningRepository.find({});
    // if (meeting_date) {\
    //   throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    // }

    // await this.ligntningRepository.save({
    //   ...createLightningDto,
    // });

    return { success: true };
  }
}
