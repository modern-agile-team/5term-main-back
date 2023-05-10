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
    return await this.lightningBoardRepository.createLightningBoard(
      lightningNo,
      title,
      contents,
      author,
    );
  }

  async deleteLightningBoard(boardNo: number) {
    return await this.lightningBoardRepository.deleteLightningBoard(boardNo);
  }

  async updateLightningBoard(
    boardNo: number,
    updateLightningBoardDto: UpdateLightningBoardDto,
  ) {
    const { title, contents } = updateLightningBoardDto;
    return await this.lightningBoardRepository.updateLightningBoard(
      boardNo,
      title,
      contents,
    );
  }

  async getLightningBoard(boardNo: number) {
    return await this.lightningBoardRepository.getLightningBoard(boardNo);
  }

  async getAllLightningBoard() {
    return await this.lightningBoardRepository.getAllLightningBoard();
  }

  async createLightningInfo(
    createLightningInfoDto: CreateLightningInfoDto,
    userNo: number,
  ) {
    const { meetingDate } = createLightningInfoDto;
    const lightningNo = await this.lightningInfoRepository.createLightningInfo(
      meetingDate,
    );
    return await this.lightningInfoRepository.createLightningToUser(
      userNo,
      lightningNo,
    );
  }
}
