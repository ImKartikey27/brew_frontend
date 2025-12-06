"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Settings, LogOut, User } from "lucide-react";
import { toast } from "sonner";

export function Header(): React.ReactElement {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      toast.error(errorMessage);
    }
  };

  const getThemeIcon = () => {
    if (!mounted) return null;
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      );
    }
    return theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  };

  const getThemeLabel = () => {
    if (!mounted) return "System";
    if (theme === "system") return "System";
    return theme === "dark" ? "Dark" : "Light";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm transition-all duration-300 animate-in fade-in-0">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-950 dark:bg-slate-50 flex-shrink-0 transition-transform active:scale-95">
              <svg
                className="w-5 h-5 text-white dark:text-slate-950"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="hidden sm:block min-w-0">
              <h1 className="text-lg font-bold text-slate-950 dark:text-slate-50">
                TaskFlow
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Manage Efficiently
              </p>
            </div>
          </div>


          {/* Right: Theme Toggle & User Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${getThemeLabel()} mode`}
              aria-label={`Switch to ${getThemeLabel()} mode`}
              className="transition-all duration-300 active:scale-95"
            >
              {mounted ? getThemeIcon() : <Sun className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full transition-all duration-300 active:scale-95"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-950 dark:bg-slate-50 flex items-center justify-center">
                    <span className="text-xs font-bold text-white dark:text-slate-950">
                      {user?.name.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in fade-in-0 zoom-in-95 duration-300">
                {user && (
                  <>
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem
                  onClick={toggleTheme}
                  className="flex items-center gap-2 cursor-pointer transition-colors"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span>{getThemeLabel()} Mode</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400 cursor-pointer transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
