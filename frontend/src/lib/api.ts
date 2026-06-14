import type { ApiResponse } from '@damta/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/** Thin typed fetch wrapper that unwraps the { success, data } envelope. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });

  let json: ApiResponse<T>;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new Error(`Invalid JSON response (${res.status})`);
  }

  if (!res.ok || !json.success) {
    const message = !json.success ? json.error.message : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return json.data;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path),
  post: <T>(path: string, body: unknown, token?: string | null) =>
    apiFetch<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};
