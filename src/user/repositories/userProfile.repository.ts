import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entities/user_profile.entity';
import { AuthCredentialDto } from './../../auth/dto/auth-credential.dto';
import { User } from '../entities/user.entity';
import { NicknameDuplicationCheckDto } from 'src/auth/dto/duplicationCheck.dto';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
  async createUserProfile(authCredentialDto: AuthCredentialDto, user: User) {
    const { nickname, phone, email, name } = authCredentialDto;
    return await this.createQueryBuilder('UserProfile')
      .insert()
      .into(UserProfile)
      .values({ nickname, phone, email, bio: '', user, name })
      .execute();
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

  async uploadProfileImg() {
    return;
  }
}
