import { Injectable, type OnModuleInit } from '@nestjs/common';
import AppRedis from '../../lib/redis.lib';

@Injectable()
export class RedisService extends AppRedis implements OnModuleInit {
  public async setData(key: string, data: object) {
    await this.resetData(key);
    return await this.redis.set(key, JSON.stringify(data));
  }

  public async getData<T = any>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    if (!data) return null;

    return JSON.parse(data) as T;
  }

  public async resetData(key: string) {
    return await this.redis.del(key);
  }

  public onModuleInit() {
    this.initiate();
  }
}
