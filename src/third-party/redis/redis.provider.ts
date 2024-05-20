import type { Provider } from '@nestjs/common';
import AppRedis from 'src/lib/redis.lib';

export const REDIS_PROVIDER = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_PROVIDER,
  useFactory: () => new AppRedis().redis,
};
