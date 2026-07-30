/** Application-wide constants */

export const SITE_NAME = 'V-Budget System';
export const SITE_DESCRIPTION = 'Hệ thống Dự báo & Tối ưu Thu Ngân sách Nhà nước sử dụng AI & Lượng tử.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const PRODUCTS_PER_PAGE = 12;
export const RELATED_PRODUCTS_COUNT = 4;
export const CAROUSEL_ITEMS_PER_SLIDE = 4;

export const CART_MAX_ITEM_QTY = 50;

export const HIDDEN_PRICE_TEXT = 'Liên hệ';

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const GENDER_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
  { value: 'X', label: 'Prefer not to say' },
];
