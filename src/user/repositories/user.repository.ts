import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialDto } from './../../auth/dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto, loginType: number) {
    const { id } = authCredentialDto;

    return await this.createQueryBuilder('User')
      .insert()
      .into(User)
      .values({
        userId: id,
        loginType,
      })
      .execute();
  }

  async idDuplicationCheck(id: string) {
    return await this.createQueryBuilder('user')
      .where('user.user_id = :userId', { userId: id })
      .getOne();
  }
}