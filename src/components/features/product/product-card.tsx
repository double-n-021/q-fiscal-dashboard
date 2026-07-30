import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { PriceDisplay } from '@/components/ui/price-display';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={cn('group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1', className)}>
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]?.imageUrl || '/images/products/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.hasDiscount && (
            <Badge variant="danger" className="shadow-sm">-{product.discount}%</Badge>
          )}
          {(!product.isActive || product.stock <= 0) && (
            <Badge variant="default" className="shadow-sm bg-black text-white dark:bg-white dark:text-black">Hết Hàng</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {product.category.name}
          </span>
        </div>

        <Link href={`/products/${product.slug}`} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <PriceDisplay 
            price={product.price}
            discountedPrice={product.discountedPrice}
            hasDiscount={product.hasDiscount}
            showPrice={product.config.showPrice}
            size="sm"
            className="flex-col items-start gap-0"
          />
        </div>
      </div>
    </div>
  );
}
