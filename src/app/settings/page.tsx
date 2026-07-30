import { Settings, Sliders } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded-xl">
          <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cấu hình Mô hình</h1>
          <p className="text-slate-500 dark:text-slate-400">Tham số XGBoost và Quantum Layer</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Sliders className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Chưa kết nối API</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Cần kết nối API backend (FastAPI) để có thể tinh chỉnh các siêu tham số (Hyperparameters) trực tiếp từ giao diện.
        </p>
      </div>
    </div>
  );
}
