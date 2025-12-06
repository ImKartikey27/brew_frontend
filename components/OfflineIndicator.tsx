"use client";

import { useOnline } from "@/lib/hooks/useOnline";
import { AlertCircle } from "lucide-react";

export function OfflineIndicator(): React.ReactElement | null {
  const isOnline = useOnline();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto max-w-sm bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg shadow-lg p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
          You're offline
        </p>
        <p className="text-xs text-amber-800 dark:text-amber-200 mt-0.5">
          Some features may be limited
        </p>
      </div>
    </div>
  );
}
