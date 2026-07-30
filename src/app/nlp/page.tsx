import { Newspaper, MessageCircle } from "lucide-react";

export default function NlpPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
          <Newspaper className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Phân tích Báo chí (NLP)</h1>
          <p className="text-slate-500 dark:text-slate-400">Trích xuất Sentiment Index bằng PhoBERT</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <MessageCircle className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Đang Crawl dữ liệu</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Các bots đang thu thập 100,000+ bài báo kinh tế từ VnEconomy và CafeF để chạy phân tích cảm xúc (Sentiment Analysis).
        </p>
      </div>
    </div>
  );
}
