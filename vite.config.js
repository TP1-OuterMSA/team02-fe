import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/team2/',
  server: {
    proxy: {
      // 브라우저에서 /api로 요청이 들어오면,
      "/web": {
        target: "https://place.map.kakao.com/",  // target url을 yes24로 변경하고,
        changeOrigin: true,  // target과 같은 도메인의 요청인 것처럼
        rewrite: (path) => path.replace(/^\/web/, ""),	// target url로 요청시 /api 문자열은 제거
      },
      "/place":{
        target: "https://maps.googleapis.com/maps/api/place/",  // target url을 yes24로 변경하고,
        changeOrigin: true,  // target과 같은 도메인의 요청인 것처럼
        rewrite: (path) => path.replace(/^\/place/, ""),	// target url로 요청시 /api 문자열은 제거
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  }
})
