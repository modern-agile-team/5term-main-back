import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entities/user_profile.entity';
import { AuthCredentialDto } from './../../auth/dto/auth-credential.dto';
import { User } from '../entities/user.entity';
import { DuplicationCheckDto } from 'src/auth/dto/duplicationCheck.dto';

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

  async nicknameDuplicationCheck(nickname: DuplicationCheckDto) {
    return await this.createQueryBuilder('userProfile')
      .where('userProfile.nickname = :nickname', { nickname: nickname })
      .getOne();
  }

  async phoneDuplicationCheck(phoneNumber: number) {
    const phone = phoneNumber
      .toString()
      .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');

    return await this.createQueryBuilder('userProfile')
      .where('userProfile.phone = :phone', { phone: phone })
      .getOne();
  }
}
