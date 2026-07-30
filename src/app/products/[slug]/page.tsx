import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PriceDisplay } from '@/components/ui/price-display';
import type { ProductDto } from '@/services/products/products.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000/api';
const INTERNAL_API_URL = 'http://127.0.0.1:3000/api';
const BACKEND_URL = process.env.BACKEND_API_URL?.replace('/api', '') || 'https://be-admin-dev.tinhocabc.com';

async function getProduct(slug: string): Promise<ProductDto | null> {
  try {
    const res = await fetch(`${INTERNAL_API_URL}/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as ProductDto;
  } catch (error) {
    console.error(`BFF Error fetching product ${slug} via API:`, error);
    return null;
  }
}

async function getAllProducts(): Promise<ProductDto[]> {
  try {
    const res = await fetch(`${INTERNAL_API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`BFF Error fetching all products via API:`, error);
    return [];
  }
}

function getImageUrl(imagePath: string): string {
  return `${BACKEND_URL}${imagePath}`;
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const price = Number(product.price);
  const discount = Number(product.discount || 0);
  const hasDiscount = discount > 0 && discount <= 100;
  const discountedPrice = hasDiscount ? price - (price * discount / 100) : undefined;

  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const categoryName = product.categories?.[0]?.name || 'Chưa phân loại';

  // Lấy sản phẩm liên quan
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Trang Chủ', href: '/' },
          { label: 'Sản Phẩm', href: '/products' },
          { label: product.name }
        ]} 
        className="mb-8"
      />

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {primaryImage ? (
              <Image
                src={getImageUrl(primaryImage.imagePath)}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Không có hình ảnh
              </div>
            )}
            {hasDiscount && (
              <Badge variant="danger" className="absolute top-4 left-4 shadow-lg text-sm px-3 py-1">
                -{discount}%
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img) => (
                <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Image
                    src={getImageUrl(img.imagePath)}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
            {categoryName}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {product.name}
          </h1>

          {product.sku && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Mã sản phẩm: {product.sku}
            </p>
          )}

          {/* Price */}
          <div className="mb-6">
            <PriceDisplay
              price={price}
              discountedPrice={discountedPrice}
              hasDiscount={hasDiscount}
              showPrice={product.config?.showPrice ?? true}
              size="lg"
            />
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Còn hàng ({product.stock} sản phẩm)
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Tạm hết hàng
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Mô Tả Sản Phẩm</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
            >
              Liên Hệ Tư Vấn
            </Link>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      {product.specific && (
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Thông Số Kỹ Thuật</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Thông Tin</TableHead>
                <TableHead>Chi Tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.specific.brand && (
                <TableRow>
                  <TableCell className="font-medium">Thương Hiệu</TableCell>
                  <TableCell>{product.specific.brand}</TableCell>
                </TableRow>
              )}
              {product.specific.origin && (
                <TableRow>
                  <TableCell className="font-medium">Xuất Xứ</TableCell>
                  <TableCell>{product.specific.origin}</TableCell>
                </TableRow>
              )}
              {product.specific.warranty && (
                <TableRow>
                  <TableCell className="font-medium">Bảo Hành</TableCell>
                  <TableCell>{product.specific.warranty}</TableCell>
                </TableRow>
              )}
              {product.specific.specs && Object.entries(product.specific.specs as Record<string, string>).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell>{String(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Sản Phẩm Liên Quan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => {
              const rpImage = rp.images?.find(img => img.isPrimary) || rp.images?.[0];
              const rpPrice = Number(rp.price);
              const rpDiscount = Number(rp.discount || 0);
              const rpHasDiscount = rpDiscount > 0 && rpDiscount <= 100;
              
              return (
                <Link key={rp.id} href={`/products/${rp.slug}`} className="group">
                  <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
                      {rpImage ? (
                        <Image
                          src={getImageUrl(rpImage.imagePath)}
                          alt={rp.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                          Không có ảnh
                        </div>
                      )}
                      {rpHasDiscount && (
                        <Badge variant="danger" className="absolute top-3 left-3 shadow-sm">-{rpDiscount}%</Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-2 min-h-[3rem] group-hover:text-primary-600 transition-colors">
                        {rp.name}
                      </h4>
                      <div className="mt-2">
                        <PriceDisplay
                          price={rpPrice}
                          discountedPrice={rpHasDiscount ? rpPrice - (rpPrice * rpDiscount / 100) : undefined}
                          hasDiscount={rpHasDiscount}
                          showPrice={rp.config?.showPrice ?? true}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
