import { cn, formatCurrency } from '@/lib/utils';
import { HIDDEN_PRICE_TEXT } from '@/lib/constants';

interface PriceDisplayProps {
  price: number;
  discountedPrice?: number;
  hasDiscount?: boolean;
  showPrice?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({
  price,
  discountedPrice,
  hasDiscount,
  showPrice = true,
  size = 'md',
  className,
}: PriceDisplayProps) {
  if (!showPrice) {
    return (
      <span
        className={cn(
          'font-bold text-primary-600 dark:text-primary-400',
          {
            'text-lg': size === 'sm' || size === 'md',
            'text-3xl': size === 'lg',
          },
          className
        )}
      >
        {HIDDEN_PRICE_TEXT}
      </span>
    );
  }

  if (hasDiscount && discountedPrice !== undefined) {
    return (
      <div className={cn('flex items-end gap-2', className)}>
        <span
          className={cn(
            'font-bold text-slate-900 dark:text-white',
            {
              'text-lg': size === 'sm',
              'text-xl': size === 'md',
              'text-4xl': size === 'lg',
            }
          )}
        >
          {formatCurrency(discountedPrice)}
        </span>
        <span
          className={cn(
            'text-slate-400 line-through decoration-slate-400/50',
            {
              'text-sm': size === 'sm' || size === 'md',
              'text-xl mb-1': size === 'lg',
            }
          )}
        >
          {formatCurrency(price)}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        'font-bold text-slate-900 dark:text-white',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-4xl': size === 'lg',
        },
        className
      )}
    >
      {formatCurrency(price)}
    </span>
  );
}
