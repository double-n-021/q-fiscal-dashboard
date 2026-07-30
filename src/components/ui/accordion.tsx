'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

export function Accordion({ type = 'single', defaultValue, className, children, ...props }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('space-y-1', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean }>({
  value: '',
  isOpen: false,
});

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = context.openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn('border-b border-slate-200 dark:border-slate-800', className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);
  
  if (!context || !itemContext) throw new Error('AccordionTrigger must be used within AccordionItem');

  return (
    <button
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 w-full text-left text-slate-900 dark:text-white',
        className
      )}
      onClick={() => context.toggleItem(itemContext.value)}
      data-state={itemContext.isOpen ? 'open' : 'closed'}
      aria-expanded={itemContext.isOpen}
      type="button"
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-slate-500" />
    </button>
  );
}

export function AccordionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const itemContext = React.useContext(AccordionItemContext);
  if (!itemContext) throw new Error('AccordionContent must be used within AccordionItem');

  if (!itemContext.isOpen) return null;

  return (
    <div
      className={cn('overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', className)}
      data-state={itemContext.isOpen ? 'open' : 'closed'}
      {...props}
    >
      <div className="pb-4 pt-0 text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  );
}
