import { getRedisClient } from './redis';

/**
 * Cache-Aside Pattern
 * 
 * 1. Kiểm tra Redis có data không?
 * 2. CÓ (Cache HIT)  → Trả về ngay (< 5ms)
 * 3. KHÔNG (Cache MISS) → Gọi fetcher() lấy data
 * 4. Lưu response vào Redis với TTL
 * 5. Trả data về
 * 
 * Graceful: Nếu Redis chết → skip cache, gọi fetcher trực tiếp.
 */
export async function getOrSet<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const redis = getRedisClient();

  // Nếu Redis không available → gọi fetcher trực tiếp (graceful fallback)
  if (!redis) {
    return fetcher();
  }

  try {
    // 1. Thử lấy từ cache
    const cached = await redis.get(key);
    if (cached) {
      console.log(`[Cache] HIT: ${key}`);
      return JSON.parse(cached) as T;
    }
  } catch (err) {
    console.warn(`[Cache] Read error for "${key}":`, (err as Error).message);
    // Redis lỗi → gọi fetcher trực tiếp
    return fetcher();
  }

  // 2. Cache MISS → gọi fetcher
  console.log(`[Cache] MISS: ${key}`);
  const data = await fetcher();

  // 3. Lưu vào cache (non-blocking, không chờ)
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(data));
    console.log(`[Cache] SET: ${key} (TTL: ${ttlSeconds}s)`);
  } catch (err) {
    console.warn(`[Cache] Write error for "${key}":`, (err as Error).message);
    // Lưu cache thất bại → không sao, data đã có từ fetcher rồi
  }

  return data;
}

/**
 * Xóa cache theo key (dùng khi cần invalidate)
 */
export async function invalidateCache(key: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  try {
    await redis.del(key);
    console.log(`[Cache] DEL: ${key}`);
  } catch (err) {
    console.warn(`[Cache] Delete error for "${key}":`, (err as Error).message);
  }
}
