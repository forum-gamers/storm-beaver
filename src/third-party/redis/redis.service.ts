import { Inject, Injectable } from '@nestjs/common';
import { REDIS_PROVIDER } from './redis.provider';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_PROVIDER) private readonly redis: Redis) {}

  public async setData(key: string, data: object) {
    return await this.redis.set(key, JSON.stringify(data));
  }

  public async getData<T = any>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    if (!data) return null;

    return JSON.parse(data) as T;
  }
}
