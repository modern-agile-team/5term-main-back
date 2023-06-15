import { LightningModule } from './lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
<<<<<<< HEAD
import { StudyModule } from './study/study.module';
=======
import { RedisModule } from './redis/redis.module';
>>>>>>> a0aa648179a5eb018781fcba48b59a192502cfeb
import typeORMConfig from 'typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    StudyModule,
    LightningModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
