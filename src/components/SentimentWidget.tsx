"use client";

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts';
import { TrendingUp, AlertTriangle, MessageCircle } from 'lucide-react';

const sentimentTimeline = [
  { date: '01/01', score: 0.8, articles: 3200 },
  { date: '15/01', score: 1.2, articles: 3400 },
  { date: '01/02', score: 0.5, articles: 2800 },
  { date: '15/02', score: 0.9, articles: 3100 },
  { date: '01/03', score: 1.5, articles: 3600 },
  { date: '15/03', score: 2.1, articles: 3900 },
  { date: '01/04', score: 1.8, articles: 3500 },
  { date: '15/04', score: 2.3, articles: 4100 },
  { date: '01/05', score: 1.9, articles: 3800 },
  { date: '15/05', score: 2.4, articles: 4200 },
  { date: '01/06', score: 2.0, articles: 3700 },
  { date: '15/06', score: 2.4, articles: 4500 },
];

export function SentimentWidget() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Chỉ số Tâm lý Thị trường
          </h3>
          <p className="text-xs text-slate-500">PhoBERT Sentiment Index - Cập nhật hàng ngày</p>
        </div>
      </div>

      {/* Current Score */}
      <div className="flex items-center justify-between mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/15 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
        <div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+2.4</div>
          <div className="text-xs text-emerald-500 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> Tích cực (Tháng trước: +1.8)
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">4,500</div>
          <div className="text-xs text-slate-500">bài phân tích</div>
        </div>
      </div>

      {/* Sentiment Timeline Chart */}
      <div className="flex-1 min-h-[200px]">
        <p className="text-xs font-medium text-slate-500 mb-2">Xu hướng Sentiment 6 tháng gần nhất</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sentimentTimeline} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis domain={[-1, 3]} tick={{ fontSize: 10 }} />
            <Tooltip
              formatter={(value: any, name: any) => {
                if (name === 'score') return [`${Number(value).toFixed(1)}`, 'Sentiment'];
                return [value, name];
              }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="score" stroke="#10b981" fill="url(#sentimentGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Keywords */}
      <div className="mt-4 space-y-3">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
          <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Từ khóa nổi bật hôm nay</h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">Giải ngân đầu tư công ↑</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">FDI tăng trưởng</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-full">Lạm phát năng lượng</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">Chính sách thuế mới</span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-amber-800 dark:text-amber-500 mb-0.5">Cảnh báo rủi ro</h4>
            <p className="text-xs text-amber-700 dark:text-amber-600 leading-relaxed">
              Dự báo nguồn thu XNK có thể giảm 5% trong Q4 do đứt gãy chuỗi cung ứng châu Âu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
