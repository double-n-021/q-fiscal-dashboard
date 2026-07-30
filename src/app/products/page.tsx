import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductGrid } from '@/components/features/product/product-grid';
import { Pagination } from '@/components/ui/pagination';
import type { ProductDto } from '@/services/products/products.service';
import type { CategoryDto } from '@/services/categories/categories.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000/api';
const INTERNAL_API_URL = 'http://127.0.0.1:3000/api';
const BACKEND_URL = process.env.BACKEND_API_URL?.replace('/api', '') || 'https://be-admin-dev.tinhocabc.com';

// Server-side fetch qua BFF 
async function getProducts(): Promise<ProductDto[]> {
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

async function getCategories(): Promise<CategoryDto[]> {
  try {
    const res = await fetch(`${INTERNAL_API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`BFF Error fetching categories via API:`, error);
    return [];
  }
}

// Transform ProductDto sang format cho UI components
function toUIProduct(p: ProductDto) {
  const price = Number(p.price);
  const discount = Number(p.discount || 0);
  const hasDiscount = discount > 0 && discount <= 100;
  const discountedPrice = hasDiscount ? price - (price * discount / 100) : undefined;

  const primaryImage = p.images?.find(img => img.isPrimary) || p.images?.[0];
  const imageUrl = primaryImage
    ? `${BACKEND_URL}${primaryImage.imagePath}`
    : '/images/products/placeholder.svg';

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description || '',
    price,
    discount,
    hasDiscount,
    discountedPrice,
    stock: p.stock || 0,
    isActive: p.isActive,
    sku: p.sku,
    category: p.categories?.[0]
      ? { id: p.categories[0].id, name: p.categories[0].name, slug: p.categories[0].slug || '' }
      : { id: 'uncategorized', name: 'Chưa phân loại', slug: 'uncategorized' },
    config: {
      isVisible: p.config?.isVisible ?? true,
      showPrice: p.config?.showPrice ?? true,
      showStock: p.config?.showStock ?? false,
    },
    specifics: {
      brand: p.specific?.brand || '',
      origin: p.specific?.origin || '',
      warranty: p.specific?.warranty || '',
      specs: (p.specific?.specs as Record<string, string>) || {},
    },
    images: (p.images || []).map(img => ({
      id: img.id,
      imageUrl: `${BACKEND_URL}${img.imagePath}`,
      isPrimary: img.isPrimary,
    })),
    averageRating: 0,
    reviewCount: 0,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const [rawProducts, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  let products = rawProducts.map(toUIProduct);

  // Filtering
  if (resolvedSearchParams.category) {
    products = products.filter((p) => p.category?.slug === resolvedSearchParams.category);
  }
  if (resolvedSearchParams.search) {
    const q = resolvedSearchParams.search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
  }
  if (resolvedSearchParams.sort === 'price_asc') {
    products.sort((a, b) => (a.hasDiscount ? (a.discountedPrice ?? a.price) : a.price) - (b.hasDiscount ? (b.discountedPrice ?? b.price) : b.price));
  } else if (resolvedSearchParams.sort === 'price_desc') {
    products.sort((a, b) => (b.hasDiscount ? (b.discountedPrice ?? b.price) : b.price) - (a.hasDiscount ? (a.discountedPrice ?? a.price) : a.price));
  }

  // Pagination
  const itemsPerPage = 8;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: 'Trang Chủ', href: '/' }, { label: 'Sản Phẩm' }]} className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar: Categories từ DB */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                Danh Mục
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/products" className={`hover:text-primary-600 transition-colors ${!resolvedSearchParams.category ? 'font-semibold text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    Tất Cả Sản Phẩm
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/products?category=${cat.name?.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`hover:text-primary-600 transition-colors text-slate-600 dark:text-slate-400`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {resolvedSearchParams.search 
                ? `Kết quả tìm kiếm cho "${resolvedSearchParams.search}"`
                : 'Tất Cả Sản Phẩm'}
            </h1>
            <div className="flex items-center gap-2">
              <select className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                <option value="newest">Sắp xếp: Mới nhất</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <>
              <ProductGrid title="" products={paginatedProducts} className="py-0 md:py-0 border-0" />
              <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/products" />
              </div>
            </>
          ) : (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-slate-500">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
