import { LightningInfoEntity } from '../entities/lightning-info.entity';

import { EntityRepository, Repository } from 'typeorm';
import { ConfigService } from 'aws-sdk';
import { LightningBoardEntity } from '../entities/lightning-boards.entity';

@EntityRepository(LightningBoardEntity)
export class lightningInfo {
  constructor(
    private readonly ligntningRepository: Repository<LightningInfoEntity>,
    private readonly configService: ConfigService,
  ) {}

  async;
}
