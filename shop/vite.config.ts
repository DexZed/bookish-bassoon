import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "./",

  publicDir: false,

  build: {
    outDir: "../dist",
    emptyOutDir: true,

    minify: false,
    sourcemap: false,

    modulePreload: {
      polyfill: false
    },

    rollupOptions: {
      input: "src/index.html",
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]"
      }
    }
  }
});