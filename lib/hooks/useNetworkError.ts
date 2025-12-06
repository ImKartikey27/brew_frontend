"use client";

import { useCallback, useState } from "react";

export interface NetworkError {
  message: string;
  status?: number;
  isNetworkError: boolean;
}

export function useNetworkError() {
  const [error, setError] = useState<NetworkError | null>(null);

  const handleError = useCallback((err: any): NetworkError | null => {
    // Check if it's a network error
    if (!err.response) {
      const networkError: NetworkError = {
        message: "Network error. Please check your connection and try again.",
        isNetworkError: true,
      };
      setError(networkError);
      return networkError;
    }

    // Check if it's a server error
    if (err.response?.status >= 500) {
      const serverError: NetworkError = {
        message: "Server error. Please try again later.",
        status: err.response.status,
        isNetworkError: false,
      };
      setError(serverError);
      return serverError;
    }

    // For other errors, don't show network error
    setError(null);
    return null;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
