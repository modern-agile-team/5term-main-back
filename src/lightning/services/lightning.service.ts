import { UpdateLightningInfoDto } from './../dtos/update-lightning-info.dto';
import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { LightningBoardRepository } from './../repositories/lightning_recruitment_boards.repository';
import { LightningInfoRepository } from './../repositories/lightning-info.repository';
import { Injectable } from '@nestjs/common';
import { CreateLightningDto } from '../dtos/create-lightning-board.dto';

@Injectable()
export class LightningService {
  constructor(
    private readonly lightningInfoRepository: LightningInfoRepository,
    private readonly lightningBoardRepository: LightningBoardRepository,
  ) {}

  async createLightning(createLightningDto: CreateLightningDto) {
    const { meetingDate } = createLightningDto;
    const result = await this.lightningInfoRepository.createLightningInfo(
      meetingDate,
    );
    const { title, contents, author } = createLightningDto;
    await this.lightningBoardRepository.createLightningBoard(
      title,
      contents,
      author,
    );
    return result;
  }

  async deleteLightningBoard(boardNo: number) {
    const response = await this.lightningBoardRepository.deleteLightningBoard(
      boardNo,
    );
    return response;
  }

  async updateLightningBoard(
    boardNo: number,
    updateLightningBoardDto: UpdateLightningBoardDto,
  ) {
    const { title, contents } = updateLightningBoardDto;
    const response = await this.lightningBoardRepository.updateLightningBoard(
      boardNo,
      title,
      contents,
    );
    return response;
  }
}
