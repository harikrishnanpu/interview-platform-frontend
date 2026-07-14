import type { AuthUser, Role } from "shared-auth";
import { dashboardPath } from "shared-auth";

export type { Role };
export { dashboardPath };

const API = "http://localhost:4000/auth";

type ApiOk<T> = {
  success: true;
  message: string;
  data: T;
};

type ApiErr = {
  success: false;
  message: string;
};

async function request<T>(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as ApiOk<T> | ApiErr;
  if (!res.ok || !json.success) {
    throw new Error(json.message || "request failed");
  }

  return json;
}

export async function signup(
  name: string,
  email: string,
  password: string,
  role: Role
) {
  return request<{ user: AuthUser }>("/signup", { name, email, password, role });
}

export async function login(email: string, password: string) {
  return request<{ user: AuthUser }>("/login", { email, password });
}

export async function forgotPassword(email: string) {
  return request<{ resetToken: string | null }>("/forgot-password", { email });
}
