import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileRepository } from '../user/repositories/userProfile.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserImageRepository } from 'src/user/repositories/userImage.repository';

@Injectable()
export class ProfileService {
  constructor(
    private s3Service: S3Service,
    @InjectRepository(UserProfileRepository)
    private userProfileRepository: UserProfileRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserImageRepository)
    private userImageRepository: UserImageRepository,
  ) {}
  async uploadProfileImg(file, userNo) {
    const imgUrl = await this.s3Service.s3Upload(file, userNo);
    const user = await this.userRepository.findUserByNo(userNo);
    return await this.userImageRepository.updateUserImg(imgUrl, user);
  }
}
