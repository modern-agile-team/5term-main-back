import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { S3Module } from 'src/s3/s3.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [S3Module, AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [AuthModule],
})
export class ProfileModule {}
