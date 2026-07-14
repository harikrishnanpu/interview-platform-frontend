import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "shared-auth";
import authRoutes from "./routes";
import "./index.css";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

const router = createBrowserRouter(authRoutes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen bg-surface text-foreground">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </StrictMode>
);
