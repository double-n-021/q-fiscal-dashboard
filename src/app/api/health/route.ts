import { NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

/** BFF Route: GET /api/health — Kiểm tra trạng thái hệ thống */
export async function GET() {
  const checks: Record<string, string> = {};

  // Check Redis
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.ping();
      checks.redis = 'connected';
    } catch {
      checks.redis = 'disconnected';
    }
  } else {
    checks.redis = 'not_configured';
  }

  // Check Admin Backend
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL || 'https://be-admin-dev.tinhocabc.com/api'}/categories/public`,
      { cache: 'no-store' },
    );
    checks.adminBackend = res.ok ? 'reachable' : `error_${res.status}`;
  } catch {
    checks.adminBackend = 'unreachable';
  }

  const allHealthy = checks.redis === 'connected' && checks.adminBackend === 'reachable';

  return NextResponse.json({
    success: true,
    statusCode: 200,
    message: allHealthy ? 'All systems operational' : 'Some systems degraded',
    data: {
      status: allHealthy ? 'healthy' : 'degraded',
      checks,
      timestamp: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
    path: '/api/health',
  });
}
