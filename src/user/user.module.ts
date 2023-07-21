import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { S3Module } from 'src/common/s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightningBoardRepository } from 'src/lightning/repositories/lightning_recruitment_boards.repository';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserRepository } from './repositories/user.repository';
import { UserImageRepository } from './repositories/user-image.repository';
import { AuthPasswordLoginRepository } from 'src/auth/repositories/auth-password-login.repository';

@Module({
  imports: [
    S3Module,
    TypeOrmModule.forFeature([
      LightningBoardRepository,
      UserProfileRepository,
      UserRepository,
      UserImageRepository,
      AuthPasswordLoginRepository,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
