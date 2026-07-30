"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

const shapData = [
  { feature: 'Sentiment Index', value: 0.42, direction: 'positive' },
  { feature: 'GDP Growth', value: 0.31, direction: 'positive' },
  { feature: 'Giá dầu thô', value: -0.25, direction: 'negative' },
  { feature: 'Lãi suất NHNN', value: 0.19, direction: 'positive' },
  { feature: 'FDI vốn đăng ký', value: 0.15, direction: 'positive' },
  { feature: 'CPI', value: -0.12, direction: 'negative' },
  { feature: 'Xuất khẩu', value: 0.10, direction: 'positive' },
  { feature: 'Tỷ giá USD/VND', value: -0.08, direction: 'negative' },
  { feature: 'IIP', value: 0.06, direction: 'positive' },
  { feature: 'Nhập khẩu', value: -0.04, direction: 'negative' },
];

const waterfallData = [
  { name: 'Dự báo cơ sở', value: 195, total: 195, fill: '#64748b' },
  { name: 'Sentiment ↑', value: 8.2, total: 203.2, fill: '#10b981' },
  { name: 'GDP ↑', value: 6.1, total: 209.3, fill: '#10b981' },
  { name: 'Giá dầu ↓', value: -4.9, total: 204.4, fill: '#ef4444' },
  { name: 'Lãi suất ↑', value: 3.7, total: 208.1, fill: '#10b981' },
  { name: 'FDI ↑', value: 2.9, total: 211.0, fill: '#10b981' },
  { name: 'CPI ↓', value: -2.3, total: 208.7, fill: '#ef4444' },
  { name: 'Khác', value: 1.3, total: 210.0, fill: '#6366f1' },
  { name: 'Dự báo cuối', value: 210, total: 210, fill: '#3b82f6' },
];

export function ShapChart() {
  return (
    <div className="space-y-8">
      {/* SHAP Force Plot - Horizontal Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            SHAP Feature Importance
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Mức độ đóng góp của từng biến số vào dự báo tháng hiện tại. Thanh <span className="text-emerald-500 font-semibold">xanh</span> = đẩy dự báo lên, thanh <span className="text-rose-500 font-semibold">đỏ</span> = kéo dự báo xuống.
          </p>
        </div>
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={shapData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={false} />
              <XAxis type="number" domain={[-0.3, 0.5]} tickFormatter={(v) => v.toFixed(2)} />
              <YAxis type="category" dataKey="feature" width={95} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: any) => [`SHAP value: ${Number(value).toFixed(3)}`, '']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={1.5} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {shapData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value >= 0 ? '#10b981' : '#ef4444'}
                    fillOpacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            SHAP Waterfall - Phân tích Dự báo Tháng 6/2026
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Giải thích cách từng yếu tố đóng góp vào kết quả dự báo cuối cùng (đơn vị: Nghìn tỷ VND).
          </p>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[180, 220]} unit="T" />
              <Tooltip
                formatter={(value: any) => [`${value > 0 ? '+' : ''}${Number(value).toFixed(1)} Nghìn tỷ`, '']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.9} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500"></span> Tác động tích cực</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-500"></span> Tác động tiêu cực</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500"></span> Tổng dự báo</span>
        </div>
      </div>
    </div>
  );
}
