import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileRepository } from '../user/repositories/userProfile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private s3Service: S3Service,
    @InjectRepository(UserProfileRepository)
    private userProfileRepository: UserProfileRepository,
  ) {}
  async uploadProfileImg(file, userNo) {
    const imgUrl = await this.s3Service.s3Upload(file, userNo);
    // return await this.userProfileRepository;
    return imgUrl;
  }
}
