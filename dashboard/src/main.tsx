import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "shared-auth";
import DashboardRoutes from "./routes";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-surface text-foreground">
          <DashboardRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
