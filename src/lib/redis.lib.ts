import Redis from 'ioredis';
import { config } from 'dotenv';

config();

export default class AppRedis {
  public redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASS,
    });

    this.redis.on('connect', () => {
      console.info(new Date().toISOString() + ' info: connect to redis');
    });

    this.redis.on('error', (err) => {
      console.log(`${new Date().toISOString()} error: redis:${err}`);
    });
  }
}
