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
      .addSelect('userProfile.phone', 'phone')
      .addSelect('userProfile.email', 'email')
      .addSelect('userImage.imgUrl', 'imgUrl')
      .getRawOne();

    if (!userProfile) {
      return null;
    }

    return { ...userProfile };
  }

  async changeEmail(email: string, userId: number) {
    const userProfile = await this.findOne({
      where: { userId },
    });

    userProfile.email = email;

    return this.save(userProfile);
  }

  async changePhoneNumber(phone: string, userId: number) {
    const userProfile = await this.findOne({
      where: { userId },
    });

    userProfile.phone = phone;

    return this.save(userProfile);
  }

  async changeBio(bio: string, userId: number) {
    const userProfile = await this.findOne({
      where: { userId },
    });

    userProfile.bio = bio;

    return this.save(userProfile);
  }

  // async getMyPost(userId: number) {}
}
