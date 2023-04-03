import { CreateLightningInfoDto } from './../dtos/lightning-info.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LightningService {
  create(createLightningInfoDto: CreateLightningInfoDto) {
    return 'This action adds a new lightningInfo';
  }
}
