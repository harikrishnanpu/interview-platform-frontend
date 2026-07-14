import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Role = "user" | "admin" | "interviewer";
export type Theme = "light" | "dark";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthState = {
  user: User | null;
};

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
    user: savedUser ? (JSON.parse(savedUser) as User) : null,
  } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
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

export function dashboardPath(role: Role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "interviewer") return "/interviewer/dashboard";
  return "/dashboard";
}
