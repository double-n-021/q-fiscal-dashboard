"use client";

import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Bell, Search, Hexagon, PanelLeftClose, PanelLeft, Sun, Moon } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-full relative bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-white dark:bg-[#0a0f1c] transition-all duration-300 ease-in-out",
        isCollapsed ? "md:w-20" : "md:w-72"
      )}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className={cn(
        "flex flex-col h-full min-h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "md:pl-20" : "md:pl-72"
      )}>
        {/* Top Navbar */}
        <div className="h-16 flex items-center p-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-md shadow-sm z-10 sticky top-0 transition-colors duration-300">
          <MobileNav />
          
          <div className="flex md:hidden items-center ml-2 gap-2 text-slate-800 dark:text-white">
            <Hexagon className="w-5 h-5 text-blue-600" />
            <span className="font-bold">V-Budget</span>
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={toggleCollapse}
              className="p-2 mr-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Thu gọn/Mở rộng Sidebar"
            >
              {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex w-full justify-end">
            <div className="flex items-center gap-x-2 md:gap-x-4">
              
              {/* Theme Toggle */}
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Đổi giao diện Sáng/Tối"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}

              <button className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden md:block">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notification Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#0a0f1c]"></span>
                </button>
                
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden transform origin-top-right transition-all">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Thông báo quan trọng</h3>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Cảnh báo rủi ro (AI Alert)</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dự báo thu thuế XNK sụt giảm 5% do giá dầu biến động mạnh.</p>
                          <p className="text-xs text-rose-500 font-medium mt-2">10 phút trước</p>
                        </div>
                        <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Đồng bộ dữ liệu thành công</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dữ liệu vĩ mô tháng 6/2026 đã được cập nhật từ TCTK.</p>
                          <p className="text-xs text-emerald-500 font-medium mt-2">2 giờ trước</p>
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-900/50">
                        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">Xem tất cả</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-slate-50 dark:bg-[#020617]">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10 opacity-5 pointer-events-none"></div>
          
          <div className="relative z-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
