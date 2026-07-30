import {
  Home,
  Package,
  Info,
  HelpCircle,
  Mail,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  { title: 'Trang Chủ', href: '/', icon: Home },
  { title: 'Sản Phẩm', href: '/products', icon: Package },
  { title: 'Giới Thiệu', href: '/about', icon: Info },
  { title: 'Hỏi Đáp', href: '/faq', icon: HelpCircle },
  { title: 'Liên Hệ', href: '/contact', icon: Mail },
];

export const footerNavItems = {
  aboutUs: [
    { title: 'Giới Thiệu', href: '/about' },
    { title: 'Chính Sách Bảo Mật', href: '/privacy' },
  ],
  support: [
    { title: 'Câu Hỏi Thường Gặp', href: '/faq' },
    { title: 'Thông Tin Vận Chuyển', href: '#' },
    { title: 'Chính Sách Đổi Trả', href: '#' },
  ],
  social: [
    { title: 'Facebook', href: '#' },
    { title: 'Zalo', href: '#' },
    { title: 'YouTube', href: '#' },
  ],
  contact: [
    { title: 'Hỗ Trợ Khách Hàng', href: '/contact' },
  ],
};
