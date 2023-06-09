import { UpdateLightningToUserDto } from './../dtos/update-lightning-to-user.dto';
import { LightningInfoRepository } from './../repositories/lightning-info.repository';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateLightningInfoDto } from '../dtos/create-lightning-info.dto';
import { UpdateLightningInfoDto } from '../dtos/update-lightning-info.dto';
import { LightningToUserRepository } from '../repositories/lightning-to-user.repository';
import { RequestLightningDto } from '../dtos/request-lightning.dto';
import { UpdateAcceptLightningDto } from '../dtos/update-accept-lightning.dto';

@Injectable()
export class LightningService {
  constructor(
    private readonly lightningInfoRepository: LightningInfoRepository,
    private readonly lightningToUserRepository: LightningToUserRepository,
  ) {}

  async createLightningInfo(
    createLightningInfoDto: CreateLightningInfoDto,
    userId: number,
  ) {
    const { meetingDate } = createLightningInfoDto;
    const lightningNo = await this.lightningInfoRepository.createLightningInfo(
      meetingDate,
    );
    return await this.lightningToUserRepository.createLightningToUser(
      userId,
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
    const relation = await this.lightningToUserRepository.getLightningToUser(
      relationNo,
    );
    if (!relation) {
      throw new BadRequestException('존재하지 않는 관계 입니다.');
    }
    const response = await this.lightningToUserRepository.deleteLightningToUser(
      relationNo,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 탈퇴 실패');
    }
  }

  async updateLightningInfo(
    lightningNo: number,
    updatelightningDto: UpdateLightningInfoDto,
  ) {
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

  async updateLightningToUser(
    relationNo: number,
    UpdateLightningToUserDto: UpdateLightningToUserDto,
  ) {
    const { isAdmin } = UpdateLightningToUserDto;
    const relation = await this.lightningToUserRepository.getLightningToUser(
      relationNo,
    );
    if (!relation) {
      throw new BadRequestException('존재하지 않는 번개 입니다.');
    }
    const response = await this.lightningToUserRepository.updateLightningAdmin(
      relationNo,
      isAdmin,
    );
    if (!response) {
      throw new InternalServerErrorException('번개 모임 관리자 변경 실패');
    }
  }
  async requestLightning(
    requestLightningDto: RequestLightningDto,
    userId: number,
  ) {
    const { lightningNo } = requestLightningDto;
    const lightning = await this.lightningInfoRepository.getLightningInfo(
      lightningNo,
    );
    if (!lightning) {
      throw new BadRequestException('존재하지 않는 번개 입니다.');
    }
    const response =
      await this.lightningToUserRepository.requestLightningToUser(
        userId,
        lightningNo,
      );
    if (!response) {
      throw new InternalServerErrorException('번개 모임 신청 실패');
    }
  }

  async updateAcceptLightning(
    relationNo: number,
    updateAcceptLightningDto: UpdateAcceptLightningDto,
  ) {
    const { isAccept } = updateAcceptLightningDto;
    if (isAccept === 2) {
      await this.lightningToUserRepository.deleteLightningToUser(relationNo);
      return false;
    }
    const relation = await this.lightningToUserRepository.getLightningToUser(
      relationNo,
    );

    if (!relation) {
      throw new BadRequestException('존재하지 않는 신청입니다.');
    }
    const response = await this.lightningToUserRepository.acceptLightningToUser(
      relationNo,
      isAccept,
    );
    if (!response) {
      throw new InternalServerErrorException('신청 수락 실패');
    }
    return response;
  }

  async getLightningByUser(userId: number) {
    const lightningNo = await this.lightningToUserRepository.getLightningByUser(
      userId,
    );
    if (!lightningNo) {
      throw new InternalServerErrorException('해당 유저 번개 모임 조회 실패');
    }
    return lightningNo;
  }

  async getUserByLightning(lightningNo: number) {
    const userNo = await this.lightningToUserRepository.getUserByLightning(
      lightningNo,
    );
    if (!userNo) {
      throw new InternalServerErrorException('번개 모임 멤버 조회 실패');
    }
    return userNo;
  }

  async getLightningInfo(lightningNo: number) {
    const lightning = await this.lightningInfoRepository.getLightningInfo(
      lightningNo,
    );
    if (!lightning) {
      throw new InternalServerErrorException('번개 모임 단일 조회 실패');
    }
    return lightning;
  }

  async getLightningApplicant(lightningNo: number) {
    const user = await this.lightningToUserRepository.getLightningApplicant(
      lightningNo,
    );
    if (!user) {
      throw new InternalServerErrorException('번개 신청자 조회 실패');
    }
    return user;
  }
}
