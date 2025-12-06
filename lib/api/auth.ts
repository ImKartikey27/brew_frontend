import apiClient from "./client";
import { User, ApiResponse } from "@/types";

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<{ id: string; name: string; email: string }>> {
  const { data } = await apiClient.post<ApiResponse<{ id: string; name: string; email: string }>>(
    "/auth/login",
    { email, password }
  );
  return data;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<ApiResponse<{ id: string; name: string; email: string }>> {
  const { data } = await apiClient.post<
    ApiResponse<{ id: string; name: string; email: string }>
  >("/auth/register", { name, email, password });
  return data;
}

export async function logout(): Promise<ApiResponse<null>> {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/logout");
  return data;
}

export async function refreshToken(): Promise<ApiResponse<null>> {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/refresh");
  return data;
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  try {
    const { data } = await apiClient.get<ApiResponse<User>>("/auth/me");
    return data;
  } catch {
    return {
      success: false,
      message: "Not authenticated",
    };
  }
}
