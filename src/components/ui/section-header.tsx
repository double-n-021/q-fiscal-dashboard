import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = 'Xem Tất Cả',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between mb-10', className)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
      
      {viewAllHref && (
        <Link 
          href={viewAllHref} 
          className="hidden sm:flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
        >
          {viewAllText} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
