import { NextResponse } from 'next/server';
import { getOrSet } from '@/lib/cache';
import { fetchProducts } from '@/lib/admin-api';

/** BFF Route: GET /api/products — Lấy danh sách sản phẩm (cached 5 phút) */
export async function GET() {
  try {
    const products = await getOrSet('products:all', 300, fetchProducts);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'Success',
      data: products,
      timestamp: new Date().toISOString(),
      path: '/api/products',
    });
  } catch (error) {
    console.error('BFF /api/products Error:', error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: 'Failed to fetch products',
        data: null,
        timestamp: new Date().toISOString(),
        path: '/api/products',
      },
      { status: 500 },
    );
  }
}
