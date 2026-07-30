import { FileText, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
          <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Báo cáo Quản trị</h1>
          <p className="text-slate-500 dark:text-slate-400">Xuất báo cáo định kỳ cho Bộ Tài chính</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Download className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Chưa có báo cáo nào</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Tính năng xuất báo cáo PDF/Excel tự động dựa trên cấu trúc Quantum Machine Learning đang được hoàn thiện.
        </p>
      </div>
    </div>
  );
}
