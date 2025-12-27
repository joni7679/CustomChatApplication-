import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // 🔥 VERY IMPORTANT
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: "src/widget-entry.jsx",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["iife"],
    },
  },
});
