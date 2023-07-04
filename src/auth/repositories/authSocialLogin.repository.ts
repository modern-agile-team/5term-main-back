import { EntityRepository, Repository } from 'typeorm';
import { AuthSocialLogin } from '../entities/auth_social_login.entity';
import { User } from 'src/user/entities/user.entity';
import { find } from 'rxjs';

@EntityRepository(AuthSocialLogin)
export class AuthSocialLoginRepository extends Repository<AuthSocialLogin> {
  async getUserById(id): Promise<AuthSocialLogin> {
    return (await this.findByIds(id.toString()))[0];
  }

  async getUserByUserId(userId): Promise<AuthSocialLogin> {
    return await this.findOne({
      where: { userId },
    });
  }

  async createSocialUser(id: string, accessToken: string, user: User) {
    const SocialUser = { id, accessToken, user };

    return this.save(SocialUser);
  }
}
