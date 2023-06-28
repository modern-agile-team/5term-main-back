import { EntityRepository, Repository } from 'typeorm';
import { AuthSocialLogin } from '../entities/auth_social_login.entity';

@EntityRepository(AuthSocialLogin)
export class AuthSocialLoginRepository extends Repository<AuthSocialLogin> {}
