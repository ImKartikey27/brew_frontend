import apiClient from "./client";
import { User, ApiResponse } from "@/types";

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<{ id: string; name: string; email: string }>> {
  const { data } = await apiClient.post<any>(
    "/auth/login",
    { email, password }
  );

  // Backend returns: { status: "success", data: { user: { id, name, email } } }
  // Transform to match expected format
  if (data.status === "success" && data.data?.user) {
    return {
      success: true,
      status: "success",
      message: data.message,
      data: {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
      },
    };
  }

  return data;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<ApiResponse<{ id: string; name: string; email: string }>> {
  const { data } = await apiClient.post<any>(
    "/auth/register",
    { name, email, password }
  );

  // Backend returns: { status: "success", data: { user: { id, name, email } } }
  // Transform to match expected format
  if (data.status === "success" && data.data?.user) {
    return {
      success: true,
      status: "success",
      message: data.message,
      data: {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
      },
    };
  }

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
    const { data } = await apiClient.get<any>("/auth/me");

    // Backend returns: { status: "success", data: { user: { id, name, email } } }
    // We need to transform it to match our ApiResponse<User> format
    if (data.status === "success" && data.data?.user) {
      return {
        success: true,
        status: "success",
        message: data.message,
        data: {
          _id: data.data.user.id,
          name: data.data.user.name,
          email: data.data.user.email,
          createdAt: data.data.user.createdAt || new Date().toISOString(),
          updatedAt: data.data.user.updatedAt || new Date().toISOString(),
        },
      };
    }

    return {
      success: false,
      message: "Not authenticated",
    };
  } catch {
    return {
      success: false,
      message: "Not authenticated",
    };
  }
}
