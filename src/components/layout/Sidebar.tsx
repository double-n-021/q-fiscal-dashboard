"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  LineChart, 
  Newspaper, 
  FileText, 
  Settings, 
  Hexagon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar-store';

export const routes = [
  {
    label: 'Tổng quan',
    icon: LayoutDashboard,
    href: '/',
    color: 'text-sky-500 dark:text-sky-400',
  },
  {
    label: 'Vĩ mô & NSNN',
    icon: LineChart,
    href: '/macro',
    color: 'text-violet-500 dark:text-violet-400',
  },
  {
    label: 'Phân tích Báo chí',
    icon: Newspaper,
    href: '/nlp',
    color: 'text-emerald-500 dark:text-emerald-400',
  },
  {
    label: 'Báo cáo',
    icon: FileText,
    href: '/reports',
    color: 'text-orange-500 dark:text-orange-400',
  },
  {
    label: 'Cài đặt Mô hình',
    icon: Settings,
    href: '/settings',
    color: 'text-slate-500 dark:text-slate-400',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border-r border-slate-200 dark:border-slate-800/60 shadow-xl transition-colors duration-300">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className={cn("flex items-center mb-14 gap-2 transition-all duration-300", isCollapsed ? "justify-center pl-0" : "pl-3")}>
          <div className="relative shrink-0 w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-900/30">
            <Hexagon className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-400">
              Q-Fiscal
            </h1>
          )}
        </Link>
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex p-3 w-full font-medium cursor-pointer rounded-xl transition-all duration-200",
                pathname === route.href 
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-600/10 dark:text-white shadow-[inset_4px_0_0_0_rgb(37,99,235)]" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              title={isCollapsed ? route.label : undefined}
            >
              <div className={cn("flex items-center", isCollapsed ? "justify-center" : "flex-1")}>
                <route.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3", route.color)} />
                {!isCollapsed && <span className="text-sm">{route.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="px-4 py-4 mt-auto">
          <div className="bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-x-3 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Admin User</p>
              <p className="text-xs text-slate-500">Bộ Tài chính</p>
            </div>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="px-3 py-4 mt-auto flex justify-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20" title="Admin User">
              AD
            </div>
        </div>
      )}
    </div>
  );
}
