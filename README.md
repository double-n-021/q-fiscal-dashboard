# 🛍️ ABC Frontend — Customer E-Commerce Website

Frontend cho khách hàng xem sản phẩm của **Tin Học ABC**. Được xây dựng với kiến trúc **BFF + Redis Cache-Aside Pattern**.

## Kiến Trúc

```text
Customer Browser → Next.js SSR → BFF API Routes → Redis Cache → Admin Backend (Read-Only)
```

- **BFF chỉ có GET** — Tuyệt đối không ghi dữ liệu lên Admin Database
- **Redis Cache** — Giảm tải cho Admin Backend, response < 5ms khi cache HIT
- **Graceful Fallback** — Redis chết thì BFF vẫn hoạt động bình thường

## Cài Đặt

```bash
npm install
```

## Chạy Development

```bash
npm run dev
```

## Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
REDIS_URL="redis://14.225.206.210:6379"
BACKEND_API_URL="https://be-admin-dev.tinhocabc.com/api"
BACKEND_ADMIN_USERNAME="admin"
BACKEND_ADMIN_PASSWORD="Admin@123"
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Cache**: Redis (ioredis)
- **HTTP Client**: Axios (frontend), fetch (BFF server-side)
- **Animation**: Framer Motion
