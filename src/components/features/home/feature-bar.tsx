import { Eye, ShieldCheck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Xem Chi Tiết Sản Phẩm',
    description: 'Thông tin đầy đủ, hình ảnh rõ nét',
  },
  {
    icon: ShieldCheck,
    title: 'Sản Phẩm Chính Hãng',
    description: 'Cam kết 100% hàng chính hãng',
  },
  {
    icon: Headphones,
    title: 'Tư Vấn Miễn Phí',
    description: 'Liên hệ để được hỗ trợ ngay',
  },
];

export function FeatureBar() {
  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
