import { Redis } from '@upstash/redis';

export const redis = new Redis({
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
});
