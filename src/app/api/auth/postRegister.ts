"use server"

export interface RegisterInput {
  firstName: string; lastName: string; email: string; username: string;
  password: string; phone: string; country: string; language: string; dateOfBirth: string;
}

export async function registerUser(user: RegisterInput) {
  const url = process.env.API_BASE_URL; 

  const res = await fetch(`${url}/identity/api/clients/create-client-via-web`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}
