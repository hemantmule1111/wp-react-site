import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production site: https://wpart.co.in/en/
// GitHub Pages build (`vite build --mode pages`): https://hemantmule1111.github.io/react-site/
export default defineConfig(({ command, mode }) => ({
  base:
    mode === 'pages' ? '/react-site/' : command === 'build' ? '/en/' : '/',
  plugins: [react()],
}));
