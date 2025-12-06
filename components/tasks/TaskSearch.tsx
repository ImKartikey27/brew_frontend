"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRecentSearches } from "@/lib/hooks/useRecentSearches";
import { cn } from "@/lib/utils";

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function TaskSearch({
  value,
  onChange,
  isLoading,
  placeholder = "Search tasks...",
}: TaskSearchProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showRecent, setShowRecent] = useState(false);
  const { searches, addSearch, clearSearches } = useRecentSearches();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setShowRecent(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (query: string) => {
    onChange(query);
    if (query.trim()) {
      addSearch(query);
    }
    setShowRecent(false);
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 pointer-events-none">
        <Search className="h-5 w-5" />
      </div>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowRecent(true)}
        className="pl-10 pr-10 transition-all"
        disabled={isLoading}
        aria-label="Search tasks"
        aria-describedby="search-instructions"
      />
      <span id="search-instructions" className="sr-only">
        Press Cmd+K to focus search, Escape to close suggestions
      </span>

      {value && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-slate-300 dark:border-slate-700 border-t-slate-950 dark:border-t-slate-50 rounded-full animate-spin" />
          <span className="sr-only">Searching tasks...</span>
        </div>
      )}

      {/* Recent Searches Dropdown */}
      {showRecent && !value && searches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
          <div className="p-2 space-y-1">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 px-2 py-1.5">
              Recent Searches
            </p>
            {searches.map((search) => (
              <button
                key={search}
                onClick={() => handleSearch(search)}
                className={cn(
                  "w-full text-left px-2 py-2 rounded text-sm",
                  "flex items-center gap-2",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "transition-colors"
                )}
              >
                <Clock className="h-4 w-4 text-slate-400" />
                {search}
              </button>
            ))}
            {searches.length > 0 && (
              <>
                <div className="border-t border-slate-200 dark:border-slate-800 my-1" />
                <button
                  onClick={clearSearches}
                  className="w-full text-left px-2 py-1.5 rounded text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  Clear recent
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {value && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 text-center text-sm text-slate-600 dark:text-slate-400 py-2">
          {/* This is handled by parent component */}
        </div>
      )}
    </div>
  );
}
