import {
  LightningBoardEntity,
  LightningInfoEntity,
} from '../entities/lightning.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ConfigService } from 'aws-sdk';

@EntityRepository(LightningBoardEntity)
export class lightningInfo {
  constructor(
    private readonly ligntningRepository: Repository<LightningInfoEntity>,
    private readonly configService: ConfigService,
  ) {}

  async;
}
