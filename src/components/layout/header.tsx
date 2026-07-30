'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavItems } from '@/config/navigation';
import { SITE_NAME } from '@/lib/constants';
import { ThemeToggle } from './theme-toggle';
import { IconButton } from '@/components/ui/icon-button';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="logo-link">
            <Image
              src="https://quanlydoanhnghiep.net/datafiles/1/2023-02/49694963-Abc.jpg"
              alt={SITE_NAME}
              width={120}
              height={40}
              className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <IconButton
              onClick={() => setSearchOpen(!searchOpen)}
              variant="ghost"
              aria-label="Search"
              id="search-toggle"
            >
              <Search className="h-4 w-4" />
            </IconButton>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <IconButton
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          searchOpen ? 'max-h-24 border-t border-slate-200 dark:border-slate-800 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm... (nhấn Enter)"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchOpen(false);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-950',
          mobileOpen ? 'max-h-96 border-t border-slate-200 dark:border-slate-800 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
