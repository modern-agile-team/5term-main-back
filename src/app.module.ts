import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudyManagementModule } from './study_management/study_management.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, UserModule, StudyManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
