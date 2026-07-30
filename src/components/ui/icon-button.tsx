import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'solid' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', children, ...props }, ref) => {
    const variants = {
      ghost: 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800',
      outline: 'bg-transparent text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-800/50',
      solid: 'bg-white text-slate-700 shadow-sm hover:bg-primary-50 hover:text-primary-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-primary-900/50',
      glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800',
    };

    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-9 w-9',
      lg: 'h-12 w-12',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
