import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('postgres');

const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.Port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/**/**/**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: __dirname + '/dist/src/migrations',
  },
};

export default typeORMConfig;
