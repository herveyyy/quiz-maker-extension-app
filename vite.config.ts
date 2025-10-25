import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    build: {
        assetsInlineLimit: 0,
        outDir: "dist",
        rollupOptions: {
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js",
                assetFileNames: "[name].[ext]",
            },
            input: {
                main: resolve(__dirname, "index.html"),
                background: resolve(__dirname, "src/background.ts"),
                content: resolve(__dirname, "src/content.ts"),
            },
        },
    },
    plugins: [react(), tailwindcss()],
});
