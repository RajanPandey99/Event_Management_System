import type { ApiResponse } from "../Types/ApiResponse";
import { baseURL } from "../config";

export async function get<T>(url: string, userId?: number) {
  return await request<T>("GET", url, undefined, userId);
}

export async function post<T>(url: string, body: unknown, userId?: number) {
  return await request<T>("POST", url, body, userId);
}

export async function put<T>(url: string, body: unknown, userId?: number) {
  return await request<T>("PUT", url, body, userId);
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  userId?: number,
): Promise<ApiResponse.apiresponse<T>> {

  const headers: HeadersInit = {
    Origin: window.location.host,
    "Content-Type": "application/json",
  };

  if (userId !== undefined) {
    headers["Id"] = String(userId);
  }
  const response = await fetch(`${baseURL}${url}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers,
  });
  const data = await response.json();
  if (response.ok) {
    return {
      ok: response.ok,
      status: response.status,
      data: data as T,
    };
  }
  return {
    ok: response.ok,
    status: response.status,
    message: data?.message,
  };
}
