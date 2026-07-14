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
      dts: false,
      remotes: {
        authApp: {
          type: "module",
          name: "authApp",
          entry: "http://localhost:5001/remoteEntry.js",
        },
        dashboardApp: {
          type: "module",
          name: "dashboardApp",
          entry: "http://localhost:5002/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
        "@reduxjs/toolkit": { singleton: true },
        "react-redux": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
