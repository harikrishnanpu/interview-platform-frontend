import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "authApp",
      filename: "remoteEntry.js",
      exposes: {
        "./routes": "./src/routes.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
        "@reduxjs/toolkit": { singleton: true },
        "react-redux": { singleton: true },
        axios: { singleton: true },
        "shared-auth": { singleton: true },
        "shared-config": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5001,
    strictPort: true,
    origin: "http://localhost:5001",
  },
  build: {
    target: "esnext",
  },
});
