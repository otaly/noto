import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // https://github.com/aws-amplify/amplify-js/issues/11175#issuecomment-1500702662
  define: {
    global: {},
  },
});
