import { UpdateLightningBoardDto } from '../dtos/update-lightning-board.dto';
import { LightningBoardRepository } from './../repositories/lightning_recruitment_boards.repository';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateLightningBoardDto } from '../dtos/create-lightning-board.dto';

@Injectable()
export class LightningRecruitmentService {
  constructor(
    private readonly lightningBoardRepository: LightningBoardRepository,
  ) {}

  async createLightningBoard(
    lightningId: number,
    createLightningBoardDto: CreateLightningBoardDto,
  ) {
    const { title, contents, authorId } = createLightningBoardDto;

    const response = await this.lightningBoardRepository.createLightningBoard(
      lightningId,
      title,
      contents,
      authorId,
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
}
