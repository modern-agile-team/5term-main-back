import { MongooseModule } from '@nestjs/mongoose';
import { LightningModule } from './lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudyModule } from './study/study.module';
import { RedisModule } from './redis/redis.module';
import { S3Module } from './s3/s3.module';
import { ProfileModule } from './profile/profile.module';
import { ChatsModule } from './chats/chats.module';
import { EventsModule } from './events/events.module';
import { StudyRecruitModule } from './study_recruit/study_recruit.module';
import typeORMConfig from 'src/config/typeorm.config';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MongooseModule.forRoot(config.get('mongo'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    StudyModule,
    LightningModule,
    RedisModule,
    S3Module,
    ProfileModule,
    ChatsModule,
    EventsModule,
    StudyRecruitModule,
  ],
})
export class AppModule {}
