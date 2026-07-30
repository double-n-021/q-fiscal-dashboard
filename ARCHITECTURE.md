# 🏗️ Kiến Trúc Tổng Thể Dự Án Velora (Frontend)

Tài liệu này mô tả chi tiết toàn bộ cấu trúc thư mục, công nghệ cốt lõi và phương pháp luận thiết kế để xây dựng nên dự án Velora.

## 1. Công Nghệ Lõi (Tech Stack)

Dự án này là một Modern Web App được xây dựng với những công nghệ tối tân nhất:

- **Khung ứng dụng (Framework):** **Next.js 15** (App Router) - Giúp web chạy siêu nhanh với SSR (Server-Side Rendering) và SEO cực tốt.
- **Ngôn ngữ:** **TypeScript** - Giúp kiểm soát kiểu dữ liệu, tránh lỗi ngu ngốc (runtime errors) và tự động nhắc code (autocomplete).
- **Thiết kế & Styling:** **Tailwind CSS v4** 🟢 *(Đúng vậy, chúng ta đang xài bản Tailwind mới và mạnh nhất hiện nay!)*
- **Quản lý trạng thái (State):** **Zustand** (cho Giỏ hàng/Local) & **TanStack Query** (React Query, sẽ dùng khi gọi API thật).
- **Authentication:** **NextAuth.js v5** (Beta) - Xử lý đăng nhập / đăng ký an toàn.

## 2. Cấu Trúc Thư Mục (Directory Structure)

Toàn bộ code frontend được đặt trong thư mục `src/`. Cấu trúc này được chia nhỏ theo nguyên tắc **OOP (Object-Oriented Programming) Component Composition**:

```text
src/
├── app/               → [Routing] Chứa tất cả các URL của website (ví dụ: /, /products, /products/[slug])
├── components/        → [Giao Diện] Chứa toàn bộ các khối hình thành nên trang web
│   ├── ui/            → (Base Classes) Lớp nền tảng: Button, Rating, PriceDisplay...
│   ├── features/      → (Child Classes) Lớp kế thừa: ProductGrid, HeroSection...
│   └── layout/        → (Structure) Khung sườn chung: Header, Footer
├── lib/               → [Tiện ích] Chứa mock-data (dữ liệu giả lập), hàm format tiền tệ...
├── stores/            → [State] Nơi chứa biến toàn cục (ví dụ: state của Giỏ hàng)
├── types/             → [Khai báo] Nơi quy định hình dáng dữ liệu (Product có những trường gì?)
└── providers/         → [Bao bọc] ThemeProvider (để đổi nền Sáng / Tối)
```

## 3. Kiến Trúc "Cha - Con" Của Component

Để đảm bảo dễ bảo trì (chỉ cần sửa 1 nơi, tự động cập nhật mọi nơi), giao diện được thiết kế theo 3 tầng (Tương tự tính Kế thừa trong OOP):

### Tầng 1: Lớp Atomic (`src/components/ui/`)
- Đóng vai trò như các `Base Class` trong OOP. Đây là những thành phần siêu nhỏ, không chứa nghiệp vụ.
- Ví dụ: `PriceDisplay` (chỉ nhận giá tiền vào và in ra màn hình), `Rating` (chỉ in ra icon ngôi sao), `Button`, `Badge`.

### Tầng 2: Lớp Domain/Feature (`src/components/features/`)
- Đóng vai trò như các `Child Class`. Nó lấy các class ở Tầng 1 ghép lại với nhau tạo thành một khối có ý nghĩa.
- Ví dụ: `ProductCard` (Thẻ sản phẩm) được ghép từ: `PriceDisplay` + `Rating` + `Badge`. 
- Ví dụ: `ProductGrid` (Lưới sản phẩm) sẽ gọi hàng loạt `ProductCard` để hiển thị.

### Tầng 3: Lớp Page (`src/app/`)
- Đóng vai trò là "Người Điều Phối" (Orchestrator). 
- Trang chủ (`app/page.tsx`) hay Trang chi tiết (`app/products/[slug]/page.tsx`) không tự vẽ HTML nữa, mà nó gọi các Tầng 2 ra và nhét dữ liệu vào. Rất gọn gàng!

## 4. Giải Thích Giao Tiếp Dữ Liệu (Flow)

Hiện tại, web đang chạy theo luồng sau:
1. `page.tsx` gọi dữ liệu từ `lib/mock-data.ts`.
2. Truyền dữ liệu đó xuống cho `ProductGrid`.
3. `ProductGrid` chia nhỏ ra, truyền từng sản phẩm xuống cho `ProductCard`.
4. `ProductCard` truyền giá tiền xuống cho `PriceDisplay`.

Sau này khi ghép Backend Django:
- Developer chỉ cần thay `lib/mock-data.ts` thành hàm gọi API `fetch('/api/products')`. Toàn bộ giao diện bên dưới sẽ tự động nhận dữ liệu mới mà **không cần phải đập đi xây lại!**
