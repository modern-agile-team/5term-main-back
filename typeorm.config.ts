import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { AuthSocialLogin } from 'src/auth/entities/auth_social_login.entity';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/**/**/**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
