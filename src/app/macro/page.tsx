import { LineChart, TrendingUp } from "lucide-react";

export default function MacroPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
          <LineChart className="w-6 h-6 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chỉ số Kinh tế Vĩ mô</h1>
          <p className="text-slate-500 dark:text-slate-400">Dữ liệu đầu vào cho mô hình dự báo NSNN</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <TrendingUp className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Đang đồng bộ dữ liệu</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Hệ thống đang kết nối API tới Tổng cục Thống kê để tải các chỉ số GDP, CPI, IIP và Tỷ giá. Vui lòng quay lại sau.
        </p>
      </div>
    </div>
  );
}
