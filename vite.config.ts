import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/",
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: 3000,
      host: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
} as any);