"use client";

import React from 'react';
import { Atom, Zap, CheckCircle2, XCircle } from 'lucide-react';

const allFeatures = [
  { name: 'Sentiment Index (PhoBERT)', score: 0.94, selected: true, category: 'NLP' },
  { name: 'GDP Growth Rate', score: 0.91, selected: true, category: 'Vĩ mô' },
  { name: 'Lãi suất NHNN', score: 0.87, selected: true, category: 'Vĩ mô' },
  { name: 'Giá dầu thô Brent', score: 0.85, selected: true, category: 'Quốc tế' },
  { name: 'FDI vốn đăng ký', score: 0.82, selected: true, category: 'Vĩ mô' },
  { name: 'CPI (lạm phát)', score: 0.79, selected: true, category: 'Vĩ mô' },
  { name: 'Xuất khẩu tổng', score: 0.76, selected: true, category: 'Vĩ mô' },
  { name: 'Tỷ giá USD/VND', score: 0.73, selected: true, category: 'Vĩ mô' },
  { name: 'IIP (Sản xuất CN)', score: 0.68, selected: true, category: 'Vĩ mô' },
  { name: 'Nhập khẩu tổng', score: 0.64, selected: true, category: 'Vĩ mô' },
  { name: 'PMI Sản xuất', score: 0.51, selected: false, category: 'Vĩ mô' },
  { name: 'Doanh thu bán lẻ', score: 0.47, selected: false, category: 'Vĩ mô' },
  { name: 'Tín dụng ngân hàng', score: 0.43, selected: false, category: 'Vĩ mô' },
  { name: 'VN-Index', score: 0.39, selected: false, category: 'Tài chính' },
  { name: 'Cung tiền M2', score: 0.35, selected: false, category: 'Tiền tệ' },
  { name: 'Dân số / Lao động', score: 0.21, selected: false, category: 'Xã hội' },
];

const categoryColors: Record<string, string> = {
  'NLP': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Vĩ mô': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Quốc tế': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Tài chính': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Tiền tệ': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Xã hội': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
};

export function QuantumFeatureWidget() {
  const selected = allFeatures.filter(f => f.selected);
  const rejected = allFeatures.filter(f => !f.selected);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl shadow-lg shadow-violet-500/20">
          <Atom className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Quantum Feature Selection
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            VQC (PennyLane) - 5 qubits | Top-{selected.length} / {allFeatures.length} biến
          </p>
        </div>
      </div>

      {/* Circuit info */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-3 text-center border border-violet-100 dark:border-violet-800/30">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">5</div>
          <div className="text-xs text-violet-500">Qubits</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center border border-blue-100 dark:border-blue-800/30">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">200</div>
          <div className="text-xs text-blue-500">Iterations</div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center border border-emerald-100 dark:border-emerald-800/30">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{selected.length}</div>
          <div className="text-xs text-emerald-500">Selected</div>
        </div>
      </div>

      {/* Selected Features */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Biến được chọn (Top-{selected.length})
        </h4>
        <div className="space-y-2">
          {selected.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 w-5">{i + 1}</span>
              <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">{f.name}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[f.category]}`}>{f.category}</span>
              <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${f.score * 100}%` }}></div>
              </div>
              <span className="text-xs font-mono text-slate-500 w-10 text-right">{f.score.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Features */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-slate-400" />
          Biến bị loại (nhiễu / đa cộng tuyến)
        </h4>
        <div className="space-y-1.5">
          {rejected.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg opacity-60">
              <span className="text-xs font-bold text-slate-400 w-5">{selected.length + i + 1}</span>
              <span className="flex-1 text-sm text-slate-500 dark:text-slate-400 line-through">{f.name}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[f.category]}`}>{f.category}</span>
              <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-slate-400 h-2 rounded-full" style={{ width: `${f.score * 100}%` }}></div>
              </div>
              <span className="text-xs font-mono text-slate-400 w-10 text-right">{f.score.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mt-5 p-3 bg-violet-50 dark:bg-violet-900/10 rounded-lg border border-violet-200 dark:border-violet-800/30 flex items-start gap-2">
        <Zap className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
        <p className="text-xs text-violet-700 dark:text-violet-400 leading-relaxed">
          <strong>Quantum Advantage:</strong> VQC mã hóa 32 features vào 5 qubits, khai thác Superposition để đánh giá song song toàn bộ không gian đặc trưng thay vì tuần tự như PCA/Lasso. Optimizer: COBYLA trên PennyLane Simulator.
        </p>
      </div>
    </div>
  );
}
