import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/facturador/',
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', devOptions: { enabled: true } })],
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
});
