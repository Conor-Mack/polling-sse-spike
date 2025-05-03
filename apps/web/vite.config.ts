import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listen on all network interfaces in Docker
    host: "0.0.0.0",
    // Allow HMR in Docker container
    hmr: {
      // Adjust as needed - depends on your Docker network setup
      clientPort: 5173,
      // Ensure HMR connections are properly routed
      host: "localhost",
    },
    // Enable watching files in Docker container
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
