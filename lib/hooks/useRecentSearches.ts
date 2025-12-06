"use client";

import { useState, useEffect, useCallback } from "react";

const RECENT_SEARCHES_KEY = "task-management-recent-searches";
const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setSearches(JSON.parse(stored));
      } catch {
        setSearches([]);
      }
    }
  }, []);

  const addSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setSearches((prev) => {
      const filtered = prev.filter((s) => s !== query);
      const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      if (mounted) {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, [mounted]);

  const clearSearches = useCallback(() => {
    setSearches([]);
    if (mounted) {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  }, [mounted]);

  return { searches, addSearch, clearSearches };
}
