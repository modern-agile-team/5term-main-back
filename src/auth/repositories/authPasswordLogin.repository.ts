import { EntityRepository, Repository } from 'typeorm';
import { AuthPasswordLogin } from '../entities/auth_password_login.entity';
import { AuthCredentialDto } from './../dto/auth-credential.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from '../dto/changePassword.dto';

@EntityRepository(AuthPasswordLogin)
export class AuthPasswordLoginRepository extends Repository<AuthPasswordLogin> {
  async createPasswordUser(authCredentialDto: AuthCredentialDto, user: User) {
    const { password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const authPasswordLogin = { password: hashedPassword, userId: user.id };

    return this.save(authPasswordLogin);
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const authPasswordLogin = await this.findOne({ where: { userId } });
    const { password } = changePasswordDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    authPasswordLogin.password = hashedPassword;

    return this.save(authPasswordLogin);
  }
}
