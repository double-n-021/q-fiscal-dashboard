import { Product } from '@/types';
import { ProductCard } from '@/components/features/product/product-card';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  variant?: 'default' | 'muted';
}

export function ProductGrid({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllText = 'View All',
  className,
  variant = 'default',
}: ProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        {
          'bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800': variant === 'muted',
        },
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={title} 
          subtitle={subtitle} 
          viewAllHref={viewAllHref} 
          viewAllText={viewAllText} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
