import { BudgetChart } from '@/components/BudgetChart';
import { SentimentWidget } from '@/components/SentimentWidget';
import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tổng quan Ngân sách
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              Hệ thống Dự báo & Tối ưu Thu Ngân sách Nhà nước 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Model: XGBoost + PhoBERT
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard 
            title="Dự báo Tổng thu YTD" 
            value="2,150 Nghìn Tỷ" 
            trend="+12.5%" 
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
            color="blue"
          />
          <KpiCard 
            title="Sai số dự báo (RMSE)" 
            value="1.2%" 
            trend="-0.5%" 
            trendDownIsGood
            icon={<Activity className="w-6 h-6 text-emerald-600" />}
            color="emerald"
          />
          <KpiCard 
            title="Tăng trưởng GDP (Mô phỏng)" 
            value="6.5%" 
            trend="Giữ nguyên"
            neutral
            icon={<TrendingUp className="w-6 h-6 text-violet-600" />}
            color="violet"
          />
          <KpiCard 
            title="Số bài báo đã phân tích" 
            value="124,500+" 
            trend="Hôm nay: +450"
            neutral
            icon={<BarChart3 className="w-6 h-6 text-amber-600" />}
            color="amber"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                Phân tích Kịch bản Thu Ngân sách (What-if Analysis)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Điều chỉnh các biến số vĩ mô để xem tác động trực tiếp lên dự báo thu NSNN.
              </p>
            </div>
            <BudgetChart />
          </div>

          <div className="lg:col-span-1">
            <SentimentWidget />
          </div>
        </div>

      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, icon, color, trendDownIsGood = false, neutral = false }: any) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    violet: 'bg-violet-50 dark:bg-violet-900/20',
    amber: 'bg-amber-50 dark:bg-amber-900/20',
  };

  const trendColor = neutral 
    ? 'text-slate-500' 
    : trendDownIsGood 
      ? trend.startsWith('-') ? 'text-emerald-600' : 'text-rose-600'
      : trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600';

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</h3>
        <p className={`text-sm font-medium mt-2 ${trendColor}`}>
          {trend}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${bgColors[color]}`}>
        {icon}
      </div>
    </div>
  );
}
