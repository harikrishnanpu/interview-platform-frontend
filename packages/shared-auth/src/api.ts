import { api, API_ROUTES, type ApiSuccess } from "shared-config";
import type { AuthUser, Role } from "./types";

export async function signup(
  name: string,
  email: string,
  password: string,
  role: Role
) {
  const { data } = await api.post<ApiSuccess<{ user: AuthUser }>>(
    API_ROUTES.auth.signup,
    { name, email, password, role }
  );
  return data;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiSuccess<{ user: AuthUser }>>(
    API_ROUTES.auth.login,
    { email, password }
  );
  return data;
}

export async function forgotPassword(email: string) {
  const { data } = await api.post<ApiSuccess<{ resetToken: string }>>(
    API_ROUTES.auth.forgotPassword,
    { email }
  );
  return data;
}

export async function resetPassword(token: string, password: string) {
  const { data } = await api.post<ApiSuccess<Record<string, never>>>(
    API_ROUTES.auth.resetPassword,
    { token, password }
  );
  return data;
}

export async function getMe() {
  const { data } = await api.get<ApiSuccess<{ user: AuthUser }>>(
    API_ROUTES.auth.me
  );
  return data;
}

export async function logoutApi() {
  const { data } = await api.post<ApiSuccess<Record<string, never>>>(
    API_ROUTES.auth.logout
  );
  return data;
}
