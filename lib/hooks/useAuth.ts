"use client";

import { useCallback, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authApi from "@/lib/api/auth";
import { User } from "@/types";

export function useAuth() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      try {
        const response = await authApi.getCurrentUser();
        if (response.success && response.data) {
          setIsAuthenticated(true);
          return response.data;
        }
        setIsAuthenticated(false);
        return null;
      } catch {
        setIsAuthenticated(false);
        return null;
      }
    },
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: async (response) => {
      if (response.success && response.data) {
        // Invalidate and refetch the user query to sync with backend
        await queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
        setIsAuthenticated(true);
      }
    },
    onError: () => {
      setIsAuthenticated(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => authApi.register(name, email, password),
    onSuccess: () => {
      setIsAuthenticated(false);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.removeQueries({ queryKey: ["tasks"] });
    },
  });

  const login = useCallback(
    (email: string, password: string) =>
      loginMutation.mutateAsync({ email, password }),
    [loginMutation]
  );

  const register = useCallback(
    (name: string, email: string, password: string) =>
      registerMutation.mutateAsync({ name, email, password }),
    [registerMutation]
  );

  const logout = useCallback(
    () => logoutMutation.mutateAsync(),
    [logoutMutation]
  );

  return {
    user: user || null,
    isLoading:
      isLoadingUser ||
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    isAuthenticated,
    login,
    register,
    logout,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
  };
}
