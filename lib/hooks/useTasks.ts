"use client";

import { useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import * as tasksApi from "@/lib/api/tasks";
import { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task";
import { Task, Priority, Status } from "@/types";

export interface TasksFilters {
  priority?: Priority;
  status?: Status;
}

export function useTasks(filters?: TasksFilters) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const response = await tasksApi.getTasks(filters);
      if (response.status === "success" && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Failed to fetch tasks");
    },
    retry: 1,
  });

  return {
    tasks: data?.tasks || [],
    count: data?.count || 0,
    isLoading,
    error,
    refetch,
  };
}

export function useSearchTasks(
  searchQuery: string,
  filters?: TasksFilters
) {
  const debouncedQuery = useDebounce(searchQuery, 500);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tasks", "search", debouncedQuery, filters],
    queryFn: async () => {
      if (!debouncedQuery.trim() || debouncedQuery.trim().length < 3) {
        return { count: 0, query: "", tasks: [] };
      }
      const response = await tasksApi.searchTasks(debouncedQuery, filters);
      if (response.status === "success" && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Failed to search tasks");
    },
    enabled: debouncedQuery.trim().length >= 3,
    retry: 1,
  });

  const tasks = useMemo(() => {
    if (!data?.tasks) return [];
    return data.tasks;
  }, [data?.tasks]);

  return {
    tasks,
    count: data?.count || 0,
    query: data?.query || debouncedQuery,
    isLoading: debouncedQuery.trim().length >= 3 && isLoading,
    error,
    refetch,
  };
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => tasksApi.createTask(input),
    onSuccess: (response) => {
      if (response.status === "success" && response.data?.task) {
        const newTask = response.data.task;
        queryClient.setQueryData(["tasks", undefined], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            count: oldData.count + 1,
            tasks: [newTask, ...oldData.tasks],
          };
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) =>
      tasksApi.updateTask(id, data),
    onSuccess: (response, variables) => {
      if (response.status === "success" && response.data?.task) {
        const updatedTask = response.data.task;
        queryClient.setQueryData(["tasks", undefined], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            tasks: oldData.tasks.map((task: Task) =>
              task._id === variables.id ? updatedTask : task
            ),
          };
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: (response, taskId) => {
      if (response.status === "success") {
        queryClient.setQueryData(["tasks", undefined], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            count: Math.max(0, oldData.count - 1),
            tasks: oldData.tasks.filter((task: Task) => task._id !== taskId),
          };
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
}
