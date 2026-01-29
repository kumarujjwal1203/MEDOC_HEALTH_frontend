import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Basic Vite config with React plugin
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
