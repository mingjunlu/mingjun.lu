import { Redis } from '@upstash/redis';

export const redis = new Redis({
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
});

export async function increment(key: string) {
  const value = await redis.incr(key);
  return value;
}

export async function getOne<Type>(key: string) {
  const value = await redis.get<Type>(key);
  return value;
}

export async function getMany<Type extends unknown[]>(keys: string[]) {
  const values = await redis.mget<Type>(...keys);
  return values;
}
