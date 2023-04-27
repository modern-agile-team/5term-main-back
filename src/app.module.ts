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
import typeORMConfig from 'typeorm.config';
>>>>>>> c79b955f84690a1fccd5774655abb663c8a81c11

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
<<<<<<< HEAD
    StudyModule,
=======
    LightningModule,
>>>>>>> c79b955f84690a1fccd5774655abb663c8a81c11
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
