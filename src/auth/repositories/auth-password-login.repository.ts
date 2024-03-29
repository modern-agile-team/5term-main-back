import { EntityRepository, Repository } from 'typeorm';
import { AuthPasswordLogin } from '@src/auth/entities/auth-password-login.entity';
import { AuthCredentialDto } from '@src/auth/dtos/auth-credential.dto';
import { User } from '@src/user/entities/user.entity';
import { ChangePasswordDto } from '@src/auth/dtos/change-password.dto';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

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

    if (await bcrypt.compare(password, authPasswordLogin.password)) {
      throw new BadRequestException('지금 사용중인 비밀번호와 같은 비밀번호');
    }

    authPasswordLogin.password = hashedPassword;

    return this.save(authPasswordLogin);
  }
}
