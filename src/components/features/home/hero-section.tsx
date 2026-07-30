import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSlideshow } from './hero-slideshow';
import type { ProductDto } from '@/services/products/products.service';

const BACKEND_URL = process.env.BACKEND_API_URL?.replace('/api', '') || 'https://be-admin-dev.tinhocabc.com';

interface HeroSectionProps {
  products: ProductDto[];
}

export function HeroSection({ products }: HeroSectionProps) {
  // Lấy ảnh từ sản phẩm trong DB — lấy ảnh primary của mỗi sản phẩm
  const slides = products
    .map((p) => {
      const primaryImage = p.images?.find(img => img.isPrimary) || p.images?.[0];
      if (!primaryImage) return null;
      return {
        src: `${BACKEND_URL}${primaryImage.imagePath}`,
        alt: p.name,
      };
    })
    .filter((s): s is { src: string; alt: string } => s !== null);

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-12 md:pt-20 lg:pt-28 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent z-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 dark:from-amber-600 dark:to-yellow-700 dark:text-white text-sm font-bold mb-6 shadow-md animate-sparkle">
              <Sparkles className="h-4 w-4" />
              SẢN PHẨM MỚI 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Khám Phá Sản Phẩm <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
                Công Nghệ Hàng Đầu
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
              Trải nghiệm những sản phẩm công nghệ tốt nhất từ các thương hiệu uy tín. Tin Học ABC — đối tác tin cậy cho mọi giải pháp công nghệ.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/products">Xem Sản Phẩm <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image Slideshow — Ảnh lấy từ DB Admin */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
            <HeroSlideshow slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
}
