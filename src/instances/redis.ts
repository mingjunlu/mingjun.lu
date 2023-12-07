import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
});
