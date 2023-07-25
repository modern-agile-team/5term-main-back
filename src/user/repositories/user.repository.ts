import { EntityRepository, Repository } from 'typeorm';
import { User } from '@src/user/entities/user.entity';
import { IdDuplicationCheckDto } from '@src/auth/dtos/duplication-check.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(id: string, loginType: number) {
    const user = { userId: id, loginType };
    return this.save(user);
  }

  async idDuplicationCheck({ id }: IdDuplicationCheckDto) {
    return await this.createQueryBuilder('user')
      .where('user.user_id = :userId', { userId: id })
      .getOne();
  }

  async getUserId({ userId }): Promise<User> {
    return await this.findOne({ where: { id: userId } });
  }

  async login(id: string) {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.authPasswordLogin', 'p')
      .select('user.id', 'id')
      .addSelect('user.user_id', 'userId')
      .addSelect('p.password', 'password')
      .addSelect('user.loginType', 'loginType')
      .where('user.user_id = :userId', { userId: id })
      .getRawOne();
  }

  async findUserByNo(userId: number) {
    return await this.findOne(userId);
  }

  async deleteUser(userId: number) {
    return await this.softDelete(userId);
  }
}
