import apiClient from "./client";
import { Task, ApiResponse, Priority, Status } from "@/types";
import { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task";

export interface TaskFilters {
  priority?: Priority;
  status?: Status;
}

export async function getTasks(
  filters?: TaskFilters
): Promise<ApiResponse<{ count: number; tasks: Task[] }>> {
  const params = new URLSearchParams();
  if (filters?.priority) {
    params.append("priority", filters.priority);
  }
  if (filters?.status) {
    params.append("status", filters.status);
  }

  const query = params.toString();
  const url = query ? `/tasks/get?${query}` : "/tasks/get";

  const { data } = await apiClient.get<
    ApiResponse<{ count: number; tasks: Task[] }>
  >(url);
  return data;
}

export async function searchTasks(
  query: string,
  filters?: TaskFilters
): Promise<ApiResponse<{ count: number; query: string; tasks: Task[] }>> {
  const params = new URLSearchParams();
  params.append("q", query);
  if (filters?.priority) {
    params.append("priority", filters.priority);
  }
  if (filters?.status) {
    params.append("status", filters.status);
  }

  const { data } = await apiClient.get<
    ApiResponse<{ count: number; query: string; tasks: Task[] }>
  >(`/tasks/search?${params.toString()}`);
  return data;
}

export async function createTask(
  input: CreateTaskInput
): Promise<ApiResponse<{ task: Task }>> {
  const { data } = await apiClient.post<ApiResponse<{ task: Task }>>(
    "/tasks/create",
    input
  );
  return data;
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput
): Promise<ApiResponse<{ task: Task }>> {
  const { data } = await apiClient.patch<ApiResponse<{ task: Task }>>(
    `/tasks/${id}`,
    input
  );
  return data;
}

export async function deleteTask(id: string): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/tasks/${id}`);
  return data;
}
