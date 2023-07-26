import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '@src/user/entities/user-profile.entity';
import { AuthCredentialDto } from '@src/auth/dtos/auth-credential.dto';
import { User } from '@src/user/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { SocialUserProfileDto } from '@src/auth/dtos/social-user-profile.dto';
import { UserImage } from '@src/user/entities/user-image.entity';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
  async createUserProfile(
    authCredentialDto: AuthCredentialDto,
    user: User,
    userImage: UserImage,
  ): Promise<UserProfile> {
    const { nickname, phone, email, name } = authCredentialDto;
    const userProfile = {
      nickname,
      phone,
      email,
      bio: '',
      name,
      user,
      userImage,
    };

    return this.save(userProfile);
  }

  async createSocialUserProfile(
    user: User,
    socialUserProfileDto: SocialUserProfileDto,
    userImage: UserImage,
  ): Promise<UserProfile> {
    const { name, nickname, phone, email } = socialUserProfileDto;
    return this.save({
      user,
      name,
      nickname,
      phone,
      email,
      bio: '',
      userImage,
    });
  }

  async nicknameDuplicationCheck(nickname: string): Promise<UserProfile> {
    return await this.createQueryBuilder('userProfile')
      .where('userProfile.nickname = :nickname', { nickname: nickname })
      .getOne();
  }

  async phoneDuplicationCheck(phoneNumber: number): Promise<UserProfile> {
    return await this.createQueryBuilder('userProfile')
      .where('userProfile.phone = :phone', { phone: phoneNumber })
      .getOne();
  }

  async getUserProfile(userId: number): Promise<UserProfile> {
    const userProfile = await this.createQueryBuilder('userProfile')
      .leftJoinAndSelect('userProfile.userId', 'user')
      .leftJoinAndSelect('userProfile.userImage', 'userImage')
      .where('userProfile.userId = :userId', { userId })
      .select('userProfile.name', 'name')
      .addSelect('userProfile.nickname', 'nickname')
      .addSelect('userProfile.phone', 'phone')
      .addSelect('userProfile.phone', 'phone')
      .addSelect('userProfile.email', 'email')
      .addSelect('userImage.imgUrl', 'imgUrl')
      .getRawOne();

    if (!userProfile) {
      return null;
    }

    return userProfile;
  }

  async changeEmail(email: string, userId: number): Promise<UserProfile> {
    const userProfile = await this.findOne({
      where: { userId },
    });

    if (userProfile.email === email) {
      throw new BadRequestException('변경 전 이메일과 같은 이메일');
    }

    userProfile.email = email;

    return this.save(userProfile);
  }

  async changePhoneNumber(phone: string, userId: number): Promise<UserProfile> {
    const userProfile = await this.findOne({
      where: { userId },
    });

    if (userProfile.phone === phone) {
      throw new BadRequestException('변경 전 전화번호와 같은 번호');
    }

    userProfile.phone = phone;

    return this.save(userProfile);
  }

  async changeBio(bio: string, userId: number): Promise<UserProfile> {
    const userProfile = await this.findOne({
      where: { userId },
    });

    userProfile.bio = bio;

    return this.save(userProfile);
  }
}
