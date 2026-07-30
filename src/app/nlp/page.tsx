"use client";

import { Newspaper, TrendingUp, TrendingDown, BarChart3, Clock } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';

const recentArticles = [
  { title: "Giải ngân đầu tư công 6 tháng đầu năm đạt 40% kế hoạch", source: "VnEconomy", date: "30/07/2026", sentiment: 0.72, label: "Tích cực" },
  { title: "FDI vào Việt Nam tăng 12% so với cùng kỳ", source: "CafeF", date: "29/07/2026", sentiment: 0.85, label: "Rất tích cực" },
  { title: "Lạm phát năng lượng gây áp lực lên CPI tháng 7", source: "BaoChinhphu", date: "29/07/2026", sentiment: -0.45, label: "Tiêu cực" },
  { title: "Xuất khẩu điện tử tăng mạnh nhờ đơn hàng mới", source: "VnEconomy", date: "28/07/2026", sentiment: 0.63, label: "Tích cực" },
  { title: "Ngân hàng Nhà nước giữ nguyên lãi suất điều hành", source: "CafeF", date: "28/07/2026", sentiment: 0.15, label: "Trung lập" },
  { title: "Đứt gãy chuỗi cung ứng chip bán dẫn ảnh hưởng sản xuất", source: "VnEconomy", date: "27/07/2026", sentiment: -0.68, label: "Tiêu cực" },
];

const monthlyData = [
  { month: 'T1', positive: 65, negative: 20, neutral: 15 },
  { month: 'T2', positive: 55, negative: 30, neutral: 15 },
  { month: 'T3', positive: 70, negative: 15, neutral: 15 },
  { month: 'T4', positive: 72, negative: 13, neutral: 15 },
  { month: 'T5', positive: 60, negative: 25, neutral: 15 },
  { month: 'T6', positive: 68, negative: 18, neutral: 14 },
];

const sourceBreakdown = [
  { name: 'VnEconomy', value: 42, fill: '#3b82f6' },
  { name: 'CafeF', value: 31, fill: '#10b981' },
  { name: 'BaoChinhphu', value: 18, fill: '#f59e0b' },
  { name: 'Khác', value: 9, fill: '#94a3b8' },
];

export default function NlpPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
          <Newspaper className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Phân tích Báo chí (NLP)</h1>
          <p className="text-slate-500 dark:text-slate-400">Trích xuất Sentiment Index bằng PhoBERT - 124,500+ bài đã phân tích</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <p className="text-xs text-slate-500 mb-1">Tổng bài đã crawl</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">124,523</p>
          <p className="text-xs text-emerald-500 mt-1">+450 hôm nay</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <p className="text-xs text-slate-500 mb-1">Sentiment hiện tại</p>
          <p className="text-2xl font-bold text-emerald-500">+2.4</p>
          <p className="text-xs text-emerald-500 mt-1 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> Tích cực</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <p className="text-xs text-slate-500 mb-1">Độ chính xác PhoBERT</p>
          <p className="text-2xl font-bold text-blue-500">89.2%</p>
          <p className="text-xs text-slate-500 mt-1">F1-Score trên UIT-VSFC</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <p className="text-xs text-slate-500 mb-1">Nguồn đang crawl</p>
          <p className="text-2xl font-bold text-violet-500">3</p>
          <p className="text-xs text-slate-500 mt-1">VnEconomy, CafeF, BaoChinhphu</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Phân bố Sentiment theo tháng</h3>
          <p className="text-sm text-slate-500 mb-4">Tỷ lệ bài tích cực / tiêu cực / trung lập (%)</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" />
                <YAxis unit="%" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Tích cực" radius={[0, 0, 0, 0]} />
                <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Trung lập" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Tiêu cực" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Nguồn bài báo</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={55} paddingAngle={3}>
                  {sourceBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {sourceBreakdown.map((s, i) => (
              <span key={i} className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.fill }}></span>
                {s.name} ({s.value}%)
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Bài báo phân tích gần đây</h3>
        <div className="space-y-3">
          {recentArticles.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                a.sentiment > 0.3 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                a.sentiment < -0.3 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {a.sentiment > 0 ? '+' : ''}{a.sentiment.toFixed(1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{a.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span className="font-medium">{a.source}</span>
                  <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{a.date}</span>
                </p>
              </div>
              <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full ${
                a.sentiment > 0.3 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                a.sentiment < -0.3 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
