import { CacheModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store';
import * as config from 'config';

const redisConfig = config.get('redis');
const jwtConfig = config.get('jwt');

export const cacheModule = CacheModule.register({
  useFactory: async () => ({
    store: redisStore,
    host: redisConfig.host, // env에서 정의함
    port: redisConfig.port, // env에서 정의함
    ttl: jwtConfig.refreshExpiresIn, // 캐시 유지 시간
  }),
});

@Module({
  imports: [cacheModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
