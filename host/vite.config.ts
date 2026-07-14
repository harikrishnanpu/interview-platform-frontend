import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      remotes: {
        authApp: {
          name: "authApp",
          type: "module",
          entry: "http://localhost:5001/remoteEntry.js",
        },
        dashboardApp: {
          name: "dashboardApp",
          type: "module",
          entry: "http://localhost:5002/remoteEntry.js",
        },
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
    port: 5003,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
