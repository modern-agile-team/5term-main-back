import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { S3Module } from 'src/s3/s3.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightningBoardRepository } from 'src/lightning/repositories/lightning_recruitment_boards.repository';

@Module({
  imports: [
    S3Module,
    AuthModule,
    TypeOrmModule.forFeature([LightningBoardRepository]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [AuthModule, TypeOrmModule],
})
export class ProfileModule {}
