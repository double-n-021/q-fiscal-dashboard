import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g., '/products'
  className?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    // Basic implementation. In a real app, you'd use useSearchParams to preserve other filters
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav className={cn('flex items-center justify-center space-x-2', className)} aria-label="Pagination">
      {/* Prev Button */}
      <IconButton 
        asChild 
        variant="outline" 
        className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
      >
        <Link href={createPageUrl(currentPage - 1)} aria-disabled={currentPage <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </IconButton>

      {/* Page Numbers (Simplified for demo) */}
      <div className="flex items-center space-x-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          
          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                isCurrent 
                  ? "bg-primary-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <IconButton 
        asChild 
        variant="outline" 
        className={cn(currentPage >= totalPages && "pointer-events-none opacity-50")}
      >
        <Link href={createPageUrl(currentPage + 1)} aria-disabled={currentPage >= totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </IconButton>
    </nav>
  );
}
