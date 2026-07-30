#!/bin/bash
# ============================================================
# Deploy Script — ABC Frontend (Next.js)
# VPS: 14.225.255.221 | Domain: tinhocabc.com
# ============================================================

set -e

APP_NAME="abc-frontend"
APP_DIR="/var/www/$APP_NAME"
REPO_URL="__THAY_BANG_GITHUB_REPO_URL__"  # <-- BẠN SỬA CHỖ NÀY
BRANCH="main"
NODE_VERSION="20"

echo "========================================="
echo "  🚀 Deploy $APP_NAME to tinhocabc.com"
echo "========================================="

# 1. Cài Node.js (nếu chưa có)
if ! command -v node &> /dev/null; then
    echo "📦 Cài đặt Node.js $NODE_VERSION..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
echo "✅ Node.js $(node -v)"

# 2. Cài PM2 (nếu chưa có)
if ! command -v pm2 &> /dev/null; then
    echo "📦 Cài đặt PM2..."
    sudo npm install -g pm2
fi
echo "✅ PM2 $(pm2 -v)"

# 3. Clone hoặc Pull code
if [ -d "$APP_DIR" ]; then
    echo "📥 Pull code mới..."
    cd "$APP_DIR"
    git pull origin $BRANCH
else
    echo "📥 Clone repository..."
    sudo mkdir -p "$APP_DIR"
    sudo chown $USER:$USER "$APP_DIR"
    git clone -b $BRANCH "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Cài dependencies
echo "📦 Cài đặt dependencies..."
npm ci --production=false

# 5. Copy env production
echo "⚙️  Tạo file .env.production..."
cat > .env.production << 'EOF'
NEXT_PUBLIC_SITE_URL="https://tinhocabc.com"
NEXT_PUBLIC_API_URL="https://tinhocabc.com/api"
REDIS_URL="redis://:MatKhauKhoe123!@14.225.206.210:6379"
BACKEND_API_URL="http://localhost:5000/api"
BACKEND_ADMIN_USERNAME="admin"
BACKEND_ADMIN_PASSWORD="Admin@123"
EOF

# 6. Build
echo "🔨 Build production..."
NODE_ENV=production npm run build

# 7. Khởi động / Restart với PM2
echo "🚀 Khởi động $APP_NAME với PM2..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start -- -p 3000
pm2 save
pm2 startup systemd -u $USER --hp /home/$USER 2>/dev/null || true

echo ""
echo "========================================="
echo "  ✅ Deploy thành công!"
echo "  App đang chạy tại: http://localhost:3000"
echo "  Tiếp theo: Cấu hình Nginx reverse proxy"
echo "========================================="
