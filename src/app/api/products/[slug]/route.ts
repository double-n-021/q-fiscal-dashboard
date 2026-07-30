import { NextResponse } from 'next/server';
import { getOrSet } from '@/lib/cache';
import { fetchProductBySlug } from '@/lib/admin-api';

/** BFF Route: GET /api/products/[slug] — Lấy chi tiết sản phẩm (cached 5 phút) */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const product = await getOrSet(
      `products:slug:${slug}`,
      300,
      () => fetchProductBySlug(slug),
    );

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'Success',
      data: product,
      timestamp: new Date().toISOString(),
      path: `/api/products/${slug}`,
    });
  } catch (error) {
    console.error(`BFF /api/products/${slug} Error:`, error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 404,
        message: 'Product not found',
        data: null,
        timestamp: new Date().toISOString(),
        path: `/api/products/${slug}`,
      },
      { status: 404 },
    );
  }
}
