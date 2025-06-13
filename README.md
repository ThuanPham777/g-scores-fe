# G-Scores

## Cài Đặt và Chạy Ứng Dụng

1. Clone repository:
```bash
git clone https://github.com/ThuanPham777/g-scores-fe.git
cd g-scores-fe
```

2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo file `.env` trong thư mục gốc và thêm các biến môi trường:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/
```

4. Chạy server development:
```bash
npm run dev
# hoặc
yarn dev
```

## Cấu Trúc Dự Án

```
src/
├── app/              # Thư mục app của Next.js
├── components/       # Các component React có thể tái sử dụng
├── styles/          # CSS toàn cục và CSS modules
├── types/           # Định nghĩa kiểu dữ liệu TypeScript
└── utils/           # Các hàm tiện ích
```

## Công Nghệ Sử Dụng

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Hooks

