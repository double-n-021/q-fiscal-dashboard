"use client";

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation (simplistic approach: listen to route change or just close on click)
  // For simplicity, we just provide the toggle

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          {/* Sidebar Panel */}
          <div className="relative w-72 max-w-[80%] bg-slate-950 h-full flex-col flex shadow-xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div onClick={() => setIsOpen(false)} className="h-full">
               <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
