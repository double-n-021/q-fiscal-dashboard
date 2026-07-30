# 📖 Kiến Trúc BFF + Redis Cache — ABC Frontend

## 1. Tổng Quan Hệ Thống

```text
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER (Trình duyệt)                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTP GET
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BFF (Next.js API Routes)                     │
│                                                                  │
│  GET /api/products           cache key: "products:all"    TTL 5p │
│  GET /api/products/:slug     cache key: "products:slug:x" TTL 5p │
│  GET /api/categories         cache key: "categories:pub"  TTL 10p│
│  GET /api/health             (no cache)                          │
│                                                                  │
│  [!] TUYỆT ĐỐI KHÔNG có POST/PUT/PATCH/DELETE                  │
└──────────┬──────────────────────────────┬───────────────────────┘
           │ Cache HIT (< 5ms)             │ Cache MISS
           ▼                               ▼
┌──────────────────────┐     ┌─────────────────────────────────────┐
│    REDIS CACHE       │     │      ADMIN BACKEND (Read-Only)       │
│  VPS 14.225.206.210  │     │   be-admin-dev.tinhocabc.com/api     │
│                      │     │                                      │
│  Chỉ chứa bản copy  │     │  Auth -> Query DB -> Trả JSON        │
│  read-only, có TTL   │     └──────────────┬──────────────────────┘
└──────────────────────┘                    │
                                            ▼
                              ┌─────────────────────────────────────┐
                              │        ADMIN DATABASE               │
                              │     PostgreSQL (Source of Truth)     │
                              │     BFF KHÔNG BAO GIỜ kết nối       │
                              └─────────────────────────────────────┘
```

---

## 2. Chống Ghi Đè Dữ Liệu (Read-Only Guarantee) — 3 Tầng Bảo Vệ

### Tầng 1: Service Layer (Frontend)
File `src/lib/api-client.ts` CHỈ định nghĩa hàm `get()`. Không tồn tại `post()`, `put()`, `delete()`.

### Tầng 2: BFF Routes (Server)
Mọi file route đều chỉ export `GET()`. Next.js tự động trả 405 cho mọi method khác.

### Tầng 3: Admin API Client
File `src/lib/admin-api.ts` chỉ gọi `fetch()` với method GET (trừ login lấy token).

**Cam Kết:** BFF KHÔNG CÓ KHẢ NĂNG thực thi bất kỳ thao tác GHI, XÓA, SỬA nào lên Database Admin.

---

## 3. Cache-Aside Pattern

```text
Request đến BFF
    │
    ├── Kiểm tra Redis key?
    │       │
    │       ├── CÓ (HIT) ──> Trả data từ Redis (< 5ms)
    │       │
    │       └── KHÔNG (MISS) ──> Gọi Admin Backend
    │                               │
    │                               ├── Lưu response vào Redis (TTL)
    │                               │
    │                               └── Trả data về Frontend
    │
    └── Redis chết? ──> Gọi Admin Backend trực tiếp (Graceful Fallback)
```

**Đặc biệt:** JWT Token của Admin cũng được cache 50 phút trong Redis. Thay vì mỗi request đều login lại (cách cũ), giờ chỉ login 1 lần / 50 phút.

---

## 4. Cấu Trúc Project

```text
abc-frontend/
├── src/
│   ├── app/
│   │   ├── api/                      <-- BFF Layer (chỉ GET)
│   │   │   ├── products/route.ts         GET /api/products
│   │   │   ├── products/[slug]/route.ts  GET /api/products/:slug
│   │   │   ├── categories/route.ts       GET /api/categories
│   │   │   └── health/route.ts           GET /api/health
│   │   ├── products/                 <-- Trang danh sách + chi tiết
│   │   ├── about/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   └── page.tsx                  <-- Trang chủ
│   ├── lib/
│   │   ├── redis.ts                  <-- Redis client (ioredis)
│   │   ├── cache.ts                  <-- Cache-Aside logic
│   │   ├── admin-api.ts              <-- Gọi Admin Backend (tập trung)
│   │   ├── api-client.ts            <-- Frontend axios (chỉ GET)
│   │   └── constants.ts
│   ├── services/                     <-- DTO + Service Layer
│   │   ├── products/products.service.ts
│   │   ├── categories/categories.service.ts
│   │   └── product-images/product-images.service.ts
│   └── components/                   <-- UI Components
├── .env.local                        <-- Cấu hình (Redis, Admin API)
├── package.json                      <-- name: "abc-frontend"
└── README.md
```

---

## 5. Cấu Hình (.env.local)

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Redis Cache (VPS riêng)
REDIS_URL="redis://14.225.206.210:6379"

# Admin Backend (Read-Only)
BACKEND_API_URL="https://be-admin-dev.tinhocabc.com/api"
BACKEND_ADMIN_USERNAME="admin"
BACKEND_ADMIN_PASSWORD="Admin@123"
```

Lưu ý: Biến KHÔNG có prefix `NEXT_PUBLIC_` chỉ tồn tại ở server. Browser không bao giờ thấy credentials.

---

## 6. Hướng Dẫn Cài Redis Lên VPS (14.225.206.210)

### Bước 1: SSH vào VPS
```bash
ssh root@14.225.206.210
```

### Bước 2: Cài Redis
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server -y

# CentOS/RHEL
sudo yum install redis -y
```

### Bước 3: Cấu hình cho phép kết nối từ bên ngoài
```bash
sudo nano /etc/redis/redis.conf
```
Tìm và sửa:
```conf
# Cho phép kết nối từ mọi nơi (hoặc chỉ IP cụ thể)
bind 0.0.0.0

# Bật password bảo vệ
requirepass YourStrongRedisPassword123!

# Giới hạn RAM (ví dụ 256MB)
maxmemory 256mb
maxmemory-policy allkeys-lru
```

### Bước 4: Khởi động Redis
```bash
sudo systemctl enable redis-server
sudo systemctl restart redis-server
sudo systemctl status redis-server
```

### Bước 5: Mở port firewall
```bash
# UFW (Ubuntu)
sudo ufw allow 6379/tcp

# Hoặc firewalld (CentOS)
sudo firewall-cmd --add-port=6379/tcp --permanent
sudo firewall-cmd --reload
```

### Bước 6: Test từ máy local
```bash
# Cài redis-cli trên máy local (hoặc test bằng PowerShell)
redis-cli -h 14.225.206.210 -p 6379 -a YourStrongRedisPassword123! ping
# Kết quả: PONG
```

### Bước 7: Cập nhật .env.local (nếu có password)
```env
REDIS_URL="redis://:YourStrongRedisPassword123!@14.225.206.210:6379"
```

---

## 7. Thay Đổi So Với Phiên Bản Trước

| Hạng mục | Trước | Sau |
|----------|-------|-----|
| Tên project | velora | abc-frontend |
| Cache | Không có | Redis (Cache-Aside) |
| Token login | Mỗi request login lại | Cache 50 phút |
| Duplicate code | getToken() copy 2 file | Tập trung admin-api.ts |
| Thư viện pg | Có (nguy hiểm) | Đã xóa |
| Thư viện next-auth | Có (không dùng) | Đã xóa |
| File db.ts | Có (kết nối DB trực tiếp) | Đã xóa |
| File mock-data.ts | Có (không dùng) | Đã xóa |
| Health check | Không có | GET /api/health |
| Graceful fallback | Không có | Redis chết vẫn chạy |
