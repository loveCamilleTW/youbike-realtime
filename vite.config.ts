import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/youbike-realtime/",
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@theme": "/src/theme",
    },
  },
});
