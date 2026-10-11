import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  optimizeDeps: {
    include: ["react-router"],
    force: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
  },
});
