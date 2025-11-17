// vite.config.js

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Tải các biến môi trường
  // Thêm '*' vào tham số thứ 3 để load tất cả biến, bao gồm cả biến không có tiền tố
  const env = loadEnv(mode, '.', ''); 

  return {
    // 1. FIX LỖI 404 FILE TĨNH TRÊN VERCEL
    // Sử dụng đường dẫn tương đối để đảm bảo tài nguyên tĩnh được tải đúng
    base: './', 

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    plugins: [react()],
    
    // 2. CẤU HÌNH BIẾN MÔI TRƯỜNG
    define: {
      // Đảm bảo GEMINI_API_KEY được chuyển vào code ở Frontend/Client
      // Nên sử dụng tiền tố VITE_ cho các biến Public (VITE_GEMINI_API_KEY)
      // Giá trị sẽ được lấy từ biến môi trường Vercel mà bạn đã thiết lập
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY),
      
      // Nếu bạn muốn giữ lại 'process.env.API_KEY' cho mục đích tương thích
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    },
    
    // 3. CẤU HÌNH ALIAS (ĐƯỜNG DẪN TẮT)
    resolve: {
      alias: [
        {
          // Alias '@' trỏ về thư mục gốc của dự án (cùng cấp với vite.config.js)
          // Điều này giúp import: import Component from '@/components/Component.jsx'
          '@': path.resolve(__dirname, './'), 
        },
      ],
    },
  };
});
