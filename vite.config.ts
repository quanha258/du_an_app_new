// vite.config.js

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', ''); 
  
  return {
    // ... (các cấu hình khác)

    // THÊM/CHỈNH SỬA CẤU HÌNH CHO BUILD LỖI COMMONJS
    optimizeDeps: {
      // Đảm bảo Vite xử lý đúng các thư viện CommonJS 
      // (Bạn có thể cần thêm tên các thư viện gây lỗi vào 'include' nếu cần)
      include: ['your-commonjs-library'], // Thay thế bằng thư viện gây lỗi nếu bạn biết
    },
    
    build: {
      // Cấu hình Rollup để xử lý CommonJS modules tốt hơn
      commonjsOptions: {
        include: /node_modules/,
      },
      // Giữ base: './' để fix lỗi 404 trước đó
      base: './', 
    },
    
    // ... (các cấu hình khác)
  };
});
