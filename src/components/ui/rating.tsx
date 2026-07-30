import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCount?: boolean;
}

export function Rating({
  value,
  count,
  size = 'sm',
  className,
  showCount = false,
}: RatingProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg',
          {
            'px-1.5 py-0.5': size === 'sm',
            'px-2.5 py-1': size === 'md' || size === 'lg',
          }
        )}
      >
        <Star
          className={cn('fill-amber-400 text-amber-400', {
            'h-3.5 w-3.5': size === 'sm',
            'h-4 w-4': size === 'md',
            'h-5 w-5': size === 'lg',
          })}
        />
        <span
          className={cn('font-semibold text-amber-700 dark:text-amber-400', {
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
          })}
        >
          {value}
        </span>
      </div>
      
      {showCount && count !== undefined && (
        <span
          className={cn(
            'text-slate-500 dark:text-slate-400 underline decoration-dotted cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors',
            {
              'text-xs': size === 'sm',
              'text-sm': size === 'md',
              'text-base': size === 'lg',
            }
          )}
        >
          {count} Reviews
        </span>
      )}
    </div>
  );
}
