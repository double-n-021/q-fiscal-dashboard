"use client";

import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, MessageCircle } from 'lucide-react';

export function SentimentWidget() {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Chỉ số Tâm lý Thị trường
        </h3>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-6">
        <div className="text-5xl font-bold text-emerald-500 mb-2">+2.4</div>
        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          Tích cực (Tháng trước: +1.8)
        </div>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Từ khóa nổi bật</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
              Giải ngân đầu tư công ↑
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
              FDI tăng trưởng
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-full">
              Lạm phát năng lượng
            </span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-500 mb-1">Cảnh báo rủi ro</h4>
            <p className="text-xs text-amber-700 dark:text-amber-600 leading-relaxed">
              Dự báo nguồn thu xuất nhập khẩu có thể sụt giảm 5% trong Q4 do đứt gãy chuỗi cung ứng tạm thời tại khu vực châu Âu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
