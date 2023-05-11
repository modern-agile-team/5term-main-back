import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { LightningBoardRepository } from './../repositories/lightning_recruitment_boards.repository';
import { LightningInfoRepository } from './../repositories/lightning-info.repository';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
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

    if (!response) {
      throw new InternalServerErrorException('번개 모집글 생성 실패');
    }
  }

  async deleteLightningBoard(boardNo: number) {
    const board = await this.lightningBoardRepository.getLightningBoard(
      boardNo,
    );
    if (!board) {
      throw new BadRequestException('존재하지 않는 모집글 입니다.');
    }
    const response = await this.lightningBoardRepository.deleteLightningBoard(
      boardNo,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 모집글 삭제 실패');
    }
  }

  async updateLightningBoard(
    boardNo: number,
    updateLightningBoardDto: UpdateLightningBoardDto,
  ) {
    const { title, contents } = updateLightningBoardDto;
    const board = await this.lightningBoardRepository.getLightningBoard(
      boardNo,
    );
    if (!board) {
      throw new BadRequestException('존재하지 않는 모집글 입니다.');
    }
    const response = await this.lightningBoardRepository.updateLightningBoard(
      boardNo,
      title,
      contents,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 모집글 수정 실패');
    }
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

  async deleteLightningInfo(lightningNo: number) {
    const lightning = await this.lightningInfoRepository.getLightningInfo(
      lightningNo,
    );
    if (!lightning) {
      throw new BadRequestException('존재하지 않는 번개 입니다.');
    }
    const response = await this.lightningInfoRepository.deleteLightningInfo(
      lightningNo,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 모임 삭제 실패');
    }
  }

  async deleteLightningToUser(relationNo: number) {
    const relation = await this.lightningInfoRepository.getLightningInfo(
      relationNo,
    );
    if (!relation) {
      throw new BadRequestException('존재하지 않는 관계 입니다.');
    }
    const response = await this.lightningInfoRepository.deleteLightningInfo(
      relationNo,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 탈퇴 실패');
    }
  }

  async updateLightningInfo(lightningNo: number, updatelightningDto) {
    const { meetingDate } = updatelightningDto;
    const lightning = await this.lightningInfoRepository.getLightningInfo(
      lightningNo,
    );
    if (!lightning) {
      throw new BadRequestException('존재하지 않는 번개 입니다.');
    }
    const response = await this.lightningInfoRepository.updateLightningInfo(
      lightningNo,
      meetingDate,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 모임 날짜 수정 실패');
    }
  }
}
