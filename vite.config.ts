import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()], // No tailwindcss plugin here
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add TypeScript checking
  esbuild: {
    loader: "tsx",
    include: ["src/**/*.tsx", "src/**/*.ts"],
  },
  // Enable type checking during build
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Show all warnings
        warn(warning);
      },
    },
  },
});
