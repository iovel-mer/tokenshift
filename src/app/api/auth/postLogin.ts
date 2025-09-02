"use server"

export interface LoginInput {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export async function loginUser(payload: LoginInput) {
  const url = process.env.API_BASE_URL; 

  const res = await fetch(`${url}/identity/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
   
  });

  

  let data: any = null;
  try { data = await res.json(); } catch {  }

  if (typeof window !== "undefined") {
    console.log("[loginUser] status:", res.status, data);
  }

  return { ok: res.ok, status: res.status, data };
}

export async function loginForDirectDashboard() {
  const base = process.env.API_BASE_URL;
  const url = `${base}/identity/api/auth/login-for-direct?target=dashboard`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  let data: any = null;
  try { data = await res.json(); } catch {  }

  if (typeof window !== "undefined") {
    console.log("[loginForDirectDashboard] status:", res.status, data);
  }

  return { ok: res.ok, status: res.status, data };
}
