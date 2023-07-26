import { EntityRepository, Repository } from 'typeorm';
import { UserImage } from '@src/user/entities/user-image.entity';
import { User } from '@src/user/entities/user.entity';

@EntityRepository(UserImage)
export class UserImageRepository extends Repository<UserImage> {
  async createUserImg(user: User) {
    const userImage = {
      imgUrl: null,
      imgKey: `main-user/userNo_${user.id}`,
      userId: user.id,
    };

    return await this.save(userImage);
  }

  async updateUserImg(imgUrl, userId) {
    const userImage = await this.findOne({ where: { userId } });
    userImage.imgUrl = imgUrl;

    return await this.save(userImage);
  }
}
