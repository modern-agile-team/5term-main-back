import { LightningModule } from './lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudyModule } from './study/study.module';
import { RedisModule } from './redis/redis.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { ProfileModule } from './profile/profile.module';
import typeORMConfig from 'typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    StudyModule,
    LightningModule,
    RedisModule,
    S3Module,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
