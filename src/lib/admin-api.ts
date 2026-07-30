import { getOrSet } from './cache';

/**
 * Admin API Client
 * 
 * Tập trung toàn bộ logic giao tiếp với Admin Backend:
 * - Login lấy JWT token (cached trong Redis 50 phút)
 * - Fetch products, categories (read-only)
 * 
 * ⚠️ Chỉ có GET request, KHÔNG BAO GIỜ ghi dữ liệu lên Admin Backend.
 */

const ADMIN_BACKEND = process.env.BACKEND_API_URL || 'https://be-admin-dev.tinhocabc.com/api';

// ─── Token Management ─────────────────────────────────────────

/**
 * Lấy JWT token từ Admin Backend.
 * Token được cache 50 phút trong Redis (token thường valid 60 phút).
 */
async function getToken(): Promise<string> {
  return getOrSet('auth:admin_token', 3000, async () => {
    console.log('[AdminAPI] Logging in to get fresh token...');

    const res = await fetch(`${ADMIN_BACKEND}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.BACKEND_ADMIN_USERNAME || 'admin',
        password: process.env.BACKEND_ADMIN_PASSWORD || 'Admin@123',
      }),
    });

    if (!res.ok) {
      throw new Error(`Admin login failed: ${res.status} ${res.statusText}`);
    }

    // Lấy token từ Set-Cookie header
    const cookies = res.headers.getSetCookie?.() || [];
    for (const cookie of cookies) {
      const match = cookie.match(/access_token=([^;]+)/);
      if (match) return match[1];
    }

    throw new Error('No access_token found in login response cookies');
  });
}

/**
 * Gửi authenticated GET request tới Admin Backend
 */
async function authenticatedGet<T>(path: string): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${ADMIN_BACKEND}${path}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Admin API ${path} returned ${res.status}`);
  }

  const json = await res.json();
  return json.data as T;
}

// ─── Public API (Read-Only) ──────────────────────────────────

/** Lấy tất cả sản phẩm (chỉ active) */
export async function fetchProducts(): Promise<any[]> {
  const data = await authenticatedGet<any[]>('/products');
  return (data || []).filter((p: any) => p.isActive);
}

/** Lấy chi tiết sản phẩm theo slug */
export async function fetchProductBySlug(slug: string): Promise<any> {
  return authenticatedGet<any>(`/products/slug/${slug}`);
}

/** Lấy danh mục công khai (không cần auth) */
export async function fetchCategories(): Promise<any[]> {
  const res = await fetch(`${ADMIN_BACKEND}/categories/public`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Admin API /categories/public returned ${res.status}`);
  }

  const json = await res.json();
  return json.data || [];
}
