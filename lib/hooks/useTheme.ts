"use client";

import { useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "task-management-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    let resolvedTheme: "light" | "dark" = theme === "system" 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light"
      : theme;

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (theme !== "system") {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  return { theme, setTheme, toggleTheme, mounted };
}
