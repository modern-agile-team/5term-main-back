import { MongooseModule } from '@nestjs/mongoose';
import { LightningModule } from '@src/lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { UserModule } from '@src/user/user.module';
import { StudyModule } from '@src/study/study.module';
import { RedisModule } from '@src/common/redis/redis.module';
import { S3Module } from '@src/common/s3/s3.module';
import { ChatsModule } from '@src/chats/chats.module';
import { EventsModule } from '@src/events/events.module';
import { StudyRecruitModule } from './study_recruit/study_recruit.module';
import typeORMConfig from '@src/config/typeorm.config';
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
    ChatsModule,
    EventsModule,
    StudyRecruitModule,
  ],
})
export class AppModule {}
