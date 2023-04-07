import { LightningModule } from './lightning/lightning.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import typeORMConfig from 'typeorm.config';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forRoot(typeORMConfig), LightningModule],
=======
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, UserModule],
>>>>>>> a0af053b884f56d6203545e065d558759af03484
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
