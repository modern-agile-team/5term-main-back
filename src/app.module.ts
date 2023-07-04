import { MongooseModule } from '@nestjs/mongoose';
import { LightningModule } from './lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudyModule } from './study/study.module';
import { RedisModule } from './redis/redis.module';
import { S3Module } from './s3/s3.module';
import { ProfileModule } from './profile/profile.module';

import { ChatsModule } from './chats/chats.module';
import { EventsModule } from './events/events.module';

import typeORMConfig from 'typeorm.config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
