const API = "http://localhost:4000/auth";

export type Role = "user" | "admin" | "interviewer";

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
  return request<{ user: { id: string; name: string; email: string; role: Role } }>(
    "/signup",
    { name, email, password, role }
  );
}

export async function login(email: string, password: string) {
  return request<{ user: { id: string; name: string; email: string; role: Role } }>(
    "/login",
    { email, password }
  );
}

export async function forgotPassword(email: string) {
  return request<{ resetToken: string | null }>("/forgot-password", { email });
}

export function dashboardPath(role: Role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "interviewer") return "/interviewer/dashboard";
  return "/dashboard";
}
