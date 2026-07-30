# V-Budget: Q-Fiscal Dashboard

**V-Budget** là Hệ sinh thái Dự báo & Tối ưu Thu Ngân sách Nhà nước ứng dụng Trí tuệ Nhân tạo (AI) và Máy học Lượng tử (Quantum Computing).
Dự án được phát triển trong khuôn khổ cuộc thi **AI-Quantum Challenge 2026**.

## Tính năng cốt lõi

- **Dự báo Ngân sách Lượng tử**: Tích hợp các mô hình dự báo vĩ mô nâng cao kết hợp xử lý song song trên Quantum Simulator.
- **Phân tích Cảm xúc Báo chí (NLP)**: Thu thập và chấm điểm cảm xúc (Sentiment Score) từ các bản tin tài chính, kinh tế để nhận diện các cú sốc phi tuyến.
- **XAI (Explainable AI)**: Giải thích các yếu tố (features) tác động lớn nhất đến kết quả dự báo, giúp các nhà hoạch định chính sách dễ dàng nắm bắt nguyên nhân.
- **Dashboard Trực quan**: Theo dõi tiến độ thu ngân sách, biểu đồ phân tích rủi ro và các kịch bản theo thời gian thực.

## Cấu trúc thư mục

```text
q-fiscal-dashboard/
├── src/
│   ├── app/                # App Router, chứa các pages và layout
│   ├── components/         # Các React Components tái sử dụng (UI, Charts, Widgets)
│   ├── config/             # Cấu hình tĩnh (Site config, navigation)
│   ├── lib/                # Các hàm tiện ích, API clients, cache
│   ├── providers/          # React context providers (Query, Theme)
│   ├── services/           # Lớp logic xử lý nghiệp vụ
│   ├── stores/             # Quản lý state toàn cục (Zustand)
│   └── types/              # Định nghĩa các TypeScript interfaces
├── public/                 # Các tài nguyên tĩnh (Hình ảnh, SVG, fonts)
└── package.json
```

## Công nghệ sử dụng

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Biểu đồ**: Recharts
- **Icon**: Lucide React
- **Ngôn ngữ**: TypeScript

## Hướng dẫn cài đặt & Khởi chạy

### 1. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 2. Chạy môi trường phát triển
```bash
npm run dev
```
Truy cập `http://localhost:3000` để xem ứng dụng.

## Triển khai (Deployment)

Dự án có thể dễ dàng được triển khai lên nền tảng **Vercel** hoặc máy chủ Node.js (VPS).

```bash
npm run build
npm run start
```

## Đội ngũ phát triển (Monolog Team)

- **Lê Thị Như Trang** (Đội trưởng) - Đại học Kinh tế TP.HCM
- **Nguyễn Ngọc Hà** - Đại học Kinh tế TP.HCM
- **Nguyễn Minh Mẫn** - Đại học Kinh tế TP.HCM
- **Bùi Đặng Nhật Nguyên** - Đại học CNTT - ĐHQG-HCM
- **Trương Thành Tài** - Đại học CNTT - ĐHQG-HCM
