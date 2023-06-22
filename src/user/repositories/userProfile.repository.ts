import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entities/user_profile.entity';
import { AuthCredentialDto } from './../../auth/dto/auth-credential.dto';
import { User } from '../entities/user.entity';
import { NicknameDuplicationCheckDto } from 'src/auth/dto/duplicationCheck.dto';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
  async createUserProfile(
    authCredentialDto: AuthCredentialDto,
    user: User,
    userImage: number,
  ) {
    const { nickname, phone, email, name } = authCredentialDto;
    const userProfile = {
      nickname,
      phone,
      email,
      bio: '',
      name,
      userId: user.id,
      userImage,
    };

    return this.save(userProfile);
  }

  async nicknameDuplicationCheck({ nickname }: NicknameDuplicationCheckDto) {
    return await this.createQueryBuilder('userProfile')
      .where('userProfile.nickname = :nickname', { nickname: nickname })
      .getOne();
  }

  async phoneDuplicationCheck(phoneNumber: number) {
    return await this.createQueryBuilder('userProfile')
      .where('userProfile.phone = :phone', { phone: phoneNumber })
      .getOne();
  }

  async getUserProfile(userId: number) {
    const userProfile = await this.createQueryBuilder('userProfile')
      .leftJoinAndSelect('userProfile.userId', 'user')
      .leftJoinAndSelect('userProfile.userImage', 'userImage')
      .where('userProfile.userId = :userId', { userId })
      .select('userProfile.name', 'name')
      .addSelect('userProfile.nickname', 'nickname')
      .addSelect('userProfile.phone', 'phone')
      .addSelect('user.userId', 'userId')
      .addSelect('userImage.imgUrl', 'imgUrl')
      .addSelect('userProfile.email', 'email')
      .addSelect('userProfile.phone', 'phone')
      .getRawOne();

    if (!userProfile) {
      return null;
    }
    const user = userProfile.userId;
    return { ...userProfile };
  }
}
