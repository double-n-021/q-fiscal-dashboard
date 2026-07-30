"use client";

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { routes } from './Sidebar';
import { Hexagon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Dark overlay backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar Panel - solid background, no transparency */}
          <div className="relative w-72 max-w-[80%] h-full flex flex-col bg-white dark:bg-[#0a0f1c] shadow-2xl border-r border-slate-200 dark:border-slate-800 z-[101] animate-in slide-in-from-left duration-300">
            
            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="px-6 pt-6 pb-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-900/30">
                  <Hexagon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-400">
                  V-Budget
                </h1>
              </Link>
            </div>

            {/* Divider */}
            <div className="mx-4 border-t border-slate-200 dark:border-slate-800" />

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 p-3 w-full font-medium cursor-pointer rounded-xl transition-all duration-200",
                    pathname === route.href
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-600/10 dark:text-white shadow-[inset_4px_0_0_0_rgb(37,99,235)]"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  <route.icon className={cn("h-5 w-5 shrink-0", route.color)} />
                  <span className="text-sm">{route.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Info at Bottom */}
            <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                  AD
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Admin User</p>
                  <p className="text-xs text-slate-500">Bộ Tài chính</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
