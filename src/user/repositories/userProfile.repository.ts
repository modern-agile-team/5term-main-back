import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entities/user_profile.entity';
import { AuthCredentialDto } from './../../auth/dto/auth-credential.dto';
import { User } from '../entities/user.entity';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
  async createUserProfile(authCredentialDto: AuthCredentialDto, user: User) {
    const { nickname, phone, email } = authCredentialDto;
    return this.createQueryBuilder('UserProfile')
      .insert()
      .into(UserProfile)
      .values({ nickname, phone, email, bio: '', user })
      .execute();
  }
}
