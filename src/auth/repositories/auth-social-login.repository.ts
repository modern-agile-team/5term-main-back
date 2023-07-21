import { EntityRepository, Repository } from 'typeorm';
import { AuthSocialLogin } from '../entities/auth-social-login.entity';
import { User } from 'src/user/entities/user.entity';

@EntityRepository(AuthSocialLogin)
export class AuthSocialLoginRepository extends Repository<AuthSocialLogin> {
  async getUserById(id): Promise<AuthSocialLogin> {
    return await this.findOne(id.toString());
  }

  async getUserByUserId(userId): Promise<AuthSocialLogin> {
    return await this.findOne({
      where: { userId },
    });
  }

  async createSocialUser(id: string, accessToken: string, user: User) {
    const socialUser = { id, accessToken, user };

    return this.save(socialUser);
  }

  async updateSocialAccessToken(id: string, socialAccessToken: string) {
    const socialUser: AuthSocialLogin = await this.findOne(id);
    socialUser.accessToken = socialAccessToken;

    await this.save(socialUser);
  }
}
