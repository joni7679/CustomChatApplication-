import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/inject.jsx",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["iife"],
    },
  },
});
