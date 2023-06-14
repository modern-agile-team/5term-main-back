import { MongooseModule } from '@nestjs/mongoose';
import { LightningModule } from './lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { ChatsGateway } from './chats/chats.gateway';
import typeORMConfig from 'typeorm.config';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MongooseModule.forRoot(config.get('db').MONGO_DB_URI),
    AuthModule,
    UserModule,
    LightningModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatsGateway],
})
export class AppModule {}
