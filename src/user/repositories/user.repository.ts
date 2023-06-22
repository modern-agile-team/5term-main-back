import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialDto } from './../../auth/dto/auth-credential.dto';
import { IdDuplicationCheckDto } from 'src/auth/dto/duplicationCheck.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto, loginType: number) {
    const { id } = authCredentialDto;

    // return await this.createQueryBuilder('User')
    //   .insert()
    //   .into(User)
    //   .values({
    //     userId: id,
    //     loginType,
    //   })
    //   .execute();
    const user = { userId: id, loginType };
    return this.save(user);
  }

  async idDuplicationCheck({ id }: IdDuplicationCheckDto) {
    return await this.createQueryBuilder('user')
      .where('user.user_id = :userId', { userId: id })
      .getOne();
  }

  async getUserId(user) {
    return await this.createQueryBuilder('user')
      .select(['user.id'])
      .where('user.id = :userId', { userId: user.userId })
      .getOne();
  }

  async login(id: string) {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.authPasswordLogin', 'authPasswordLogin')
      .select('user.id', 'id')
      .addSelect('user.user_id', 'userId')
      .addSelect('authPasswordLogin.password', 'password')
      .where('user.user_id = :userId', { userId: id })
      .getRawOne();
  }

  async findUserByNo(userId: number) {
    return await this.findOne(userId);
  }
}
