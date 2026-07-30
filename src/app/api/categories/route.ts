import { NextResponse } from 'next/server';
import { getOrSet } from '@/lib/cache';
import { fetchCategories } from '@/lib/admin-api';

/** BFF Route: GET /api/categories — Lấy danh mục công khai (cached 10 phút) */
export async function GET() {
  try {
    const categories = await getOrSet('categories:public', 600, fetchCategories);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'Success',
      data: categories,
      timestamp: new Date().toISOString(),
      path: '/api/categories',
    });
  } catch (error) {
    console.error('BFF /api/categories Error:', error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: 'Failed to fetch categories',
        data: null,
        timestamp: new Date().toISOString(),
        path: '/api/categories',
      },
      { status: 500 },
    );
  }
}
