import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig((env) => ({
  vite: {
    base: env.command === "serve" ? "/" : "/mep/",
    resolve: {
      tsconfigPaths: true,
    },
    server: {
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
}));