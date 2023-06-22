import { EntityRepository, Repository } from 'typeorm';
import { UserImage } from '../entities/user_image.entity';
import { User } from '../entities/user.entity';

@EntityRepository(UserImage)
export class UserImageRepository extends Repository<UserImage> {
  async updateUserImg(imgUrl, user: User) {
    const userImage = {
      imgUrl,
      imgKey: `main-user/userNo:${user.userId}`,
      userId: user,
    };

    return await this.save(userImage);
  }
}
