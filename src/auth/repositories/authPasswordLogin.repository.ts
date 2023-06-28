import { EntityRepository, Repository } from 'typeorm';
import { AuthPasswordLogin } from '../entities/auth_password_login.entity';
import { AuthCredentialDto } from './../dto/auth-credential.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(AuthPasswordLogin)
export class AuthPasswordLoginRepository extends Repository<AuthPasswordLogin> {
  async createPasswordUser(authCredentialDto: AuthCredentialDto, user: User) {
    const { password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.createQueryBuilder('AuthPasswordLoginRepository')
      .insert()
      .into(AuthPasswordLogin)
      .values({ password: hashedPassword, user })
      .execute();
  }
}
