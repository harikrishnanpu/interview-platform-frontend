export type Role = "user" | "admin" | "interviewer";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AuthState = {
  user: AuthUser | null;
};

export type AppState = {
  auth: AuthState;
};
