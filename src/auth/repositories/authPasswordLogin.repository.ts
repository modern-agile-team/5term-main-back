import { EntityRepository, Repository } from 'typeorm';
import { AuthPasswordLogin } from '../entities/auth_password_login.entity';
import { AuthCredentialDto } from './../dto/auth-credential.dto';
import { User } from 'src/user/entities/user.entity';

@EntityRepository(AuthPasswordLogin)
export class AuthPasswordLoginRepository extends Repository<AuthPasswordLogin> {
  async createPasswordUser(authCredentialDto: AuthCredentialDto, user: User) {
    const { password } = authCredentialDto;
    return this.createQueryBuilder('AuthPasswordLoginRepository')
      .insert()
      .into(AuthPasswordLogin)
      .values({ password, user })
      .execute();
  }
}
