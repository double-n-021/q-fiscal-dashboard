"use client";

import { FileText, Download, Calendar, TrendingUp, BarChart3, FileSpreadsheet } from "lucide-react";

const reports = [
  {
    title: "Báo cáo Dự báo Thu NSNN - Tháng 06/2026",
    date: "01/07/2026",
    type: "Hàng tháng",
    status: "Hoàn thành",
    summary: "Dự báo thu 215 nghìn tỷ VND. MAPE: 3.8%. Sentiment tích cực (+2.4). Top drivers: GDP growth, FDI.",
    highlights: ["MAPE đạt 3.8% (mục tiêu <5%)", "Sentiment Index tăng từ +1.8 lên +2.4", "GDP growth ổn định 6.5%"],
  },
  {
    title: "Báo cáo Dự báo Thu NSNN - Tháng 05/2026",
    date: "01/06/2026",
    type: "Hàng tháng",
    status: "Hoàn thành",
    summary: "Dự báo thu 195 nghìn tỷ VND. MAPE: 4.1%. Sentiment trung lập (+1.9). Cảnh báo: giá dầu tăng.",
    highlights: ["Cảnh báo sớm giá dầu thô tăng 15%", "Quantum VQC chọn 10/32 biến", "SHAP: GDP là biến ảnh hưởng nhất"],
  },
  {
    title: "Báo cáo Quý I/2026 - Tổng hợp",
    date: "15/04/2026",
    type: "Hàng quý",
    status: "Hoàn thành",
    summary: "Tổng thu Q1: 545 nghìn tỷ VND (vượt dự toán 8%). Mô hình AI dự báo sát thực tế hơn 18% so với ARIMA.",
    highlights: ["Q-Fiscal vượt ARIMA 18% về độ chính xác", "PhoBERT phân tích 35,000 bài báo", "3 cảnh báo sớm chính xác"],
  },
];

export default function ReportsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
            <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Báo cáo Quản trị</h1>
            <p className="text-slate-500 dark:text-slate-400">Xuất báo cáo định kỳ cho Bộ Tài chính</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20">
          <FileSpreadsheet className="w-4 h-4" />
          Tạo báo cáo mới
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Tổng báo cáo</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">12</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">MAPE trung bình</p>
            <p className="text-xl font-bold text-emerald-500">3.9%</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
          <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
            <Calendar className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Cảnh báo chính xác</p>
            <p className="text-xl font-bold text-violet-500">8/10</p>
          </div>
        </div>
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{r.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {r.date}</span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">{r.type}</span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">{r.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <FileSpreadsheet className="w-4 h-4" /> Excel
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{r.summary}</p>
            <div className="flex flex-wrap gap-2">
              {r.highlights.map((h, j) => (
                <span key={j} className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
