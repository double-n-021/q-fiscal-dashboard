import Link from 'next/link';
import Image from 'next/image';
import { footerNavItems } from '@/config/navigation';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50" id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Về Chúng Tôi */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Về Chúng Tôi
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.aboutUs.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ Trợ */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mạng Xã Hội */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Kết Nối Với Chúng Tôi
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.social.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên Hệ */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Liên Hệ
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.contact.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="https://quanlydoanhnghiep.net/datafiles/1/2023-02/49694963-Abc.jpg"
              alt={SITE_NAME}
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{SITE_NAME}</span>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
