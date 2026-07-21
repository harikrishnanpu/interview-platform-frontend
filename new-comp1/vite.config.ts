import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  federation({
    name: "newComp",
    filename: "remoteEntry.js",
      exposes: {
        './NewComp': './src/App.tsx'
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
    port: 5005,
    strictPort: true,
    origin: "http://localhost:5005",
  },
})
