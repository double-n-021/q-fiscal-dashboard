import Redis from 'ioredis';

/**
 * Redis Client Singleton
 * 
 * Kết nối tới Redis server trên VPS để cache dữ liệu.
 * Nếu Redis chết → BFF vẫn hoạt động bình thường (graceful fallback).
 */

let redis: Redis | null = null;

function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) {
    console.warn('[Redis] REDIS_URL not configured, cache disabled');
    return null;
  }

  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 3) return null; // Ngừng retry sau 3 lần
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    redis.on('connect', () => console.log('[Redis] Connected'));
    redis.on('error', (err) => console.error('[Redis] Error:', err.message));
    redis.on('close', () => {
      console.warn('[Redis] Connection closed');
      redis = null;
    });

    // Kết nối ngay (non-blocking)
    redis.connect().catch(() => {
      console.warn('[Redis] Initial connection failed, will retry');
      redis = null;
    });
  }

  return redis;
}

export { getRedisClient };
