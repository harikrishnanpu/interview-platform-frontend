import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  dashboardPath,
  type AuthState,
  type AuthUser,
} from "shared-auth";

export type Theme = "light" | "dark";
export { dashboardPath };
export type { AuthUser, AuthState, Role } from "shared-auth";

type ThemeState = {
  mode: Theme;
};

const savedUser = localStorage.getItem("auth_user");
const savedTheme = (localStorage.getItem("theme") as Theme | null) || "light";

function applyTheme(mode: Theme) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

applyTheme(savedTheme);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? (JSON.parse(savedUser) as AuthUser) : null,
  } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      localStorage.setItem("auth_user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("auth_user");
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: savedTheme } as ThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
      applyTheme(action.payload);
    },
    toggleTheme(state) {
      const next = state.mode === "light" ? "dark" : "light";
      state.mode = next;
      localStorage.setItem("theme", next);
      applyTheme(next);
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const { setTheme, toggleTheme } = themeSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
