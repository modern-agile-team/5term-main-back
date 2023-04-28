import { UpdateLightningInfoDto } from './../dtos/update-lightning-info.dto';
import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { LightningBoardRepository } from './../repositories/lightning_recruitment_boards.repository';
import { LightningInfoRepository } from './../repositories/lightning-info.repository';
import { Injectable } from '@nestjs/common';
import { CreateLightningBoardDto } from '../dtos/create-lightning-board.dto';
import { CreateLightningInfoDto } from '../dtos/create-lightning-info.dto';

@Injectable()
export class LightningService {
  constructor(
    private readonly lightningInfoRepository: LightningInfoRepository,
    private readonly lightningBoardRepository: LightningBoardRepository,
  ) {}

  async createLightningBoard(
    lightningNo,
    createLightningBoardDto: CreateLightningBoardDto,
  ) {
    const { title, contents, author } = createLightningBoardDto;
    const response = await this.lightningBoardRepository.createLightningBoard(
      lightningNo,
      title,
      contents,
      author,
    );
    return response;
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

  async getLightningBoard(boardNo: number) {
    const response = await this.lightningBoardRepository.getLightningBoard(
      boardNo,
    );
    return response;
  }

  async createLightningInfo(
    createLightningInfoDto: CreateLightningInfoDto,
    userNo: number,
  ) {
    const { meetingDate } = createLightningInfoDto;
    const lightningNo = await this.lightningInfoRepository.createLightningInfo(
      meetingDate,
    );
    await this.lightningInfoRepository.createLightningToUser(
      userNo,
      lightningNo,
    );
  }
}
