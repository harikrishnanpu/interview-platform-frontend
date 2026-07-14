import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "shared-auth";
import dashboardRoutes from "./routes";
import "./index.css";

const demoUser: AuthUser = {
  id: "1",
  name: "Demo",
  email: "demo@test.com",
  role: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: demoUser } as AuthState,
  reducers: {},
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

const router = createBrowserRouter(dashboardRoutes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen bg-surface text-foreground">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </StrictMode>
);
