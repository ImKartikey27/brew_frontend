"use client";

import { Task, Priority, Status } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, MoreVertical } from "lucide-react";
import { getHighlightedMatches } from "@/lib/utils/search";

const priorityConfig: Record<Priority, { label: string; className: string }> =
  {
    low: {
      label: "Low",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    medium: {
      label: "Medium",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    high: {
      label: "High",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

const statusConfig: Record<Status, { label: string; className: string }> = {
  "To Do": {
    label: "To Do",
    className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  },
  "In Progress": {
    label: "In Progress",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  Done: {
    label: "Done",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
};

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (task: Task, status: Status) => Promise<void>;
  searchQuery?: string;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange, searchQuery }: TaskCardProps): React.ReactElement {
  const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const priorityConfig_value = priorityConfig[task.priority];
  const statusConfig_value = statusConfig[task.status];

  const statuses: Status[] = ["To Do", "In Progress", "Done"];

  const renderHighlightedText = (text: string) => {
    if (!searchQuery) return text;

    const parts = getHighlightedMatches(text, searchQuery);
    return parts.map((part, idx) => (
      part.isMatch ? (
        <mark key={idx} className="bg-yellow-200 dark:bg-yellow-700 font-semibold">
          {part.text}
        </mark>
      ) : (
        <span key={idx}>{part.text}</span>
      )
    ));
  };

  async function handleStatusChange(newStatus: Status): Promise<void> {
    if (onStatusChange) {
      await onStatusChange(task, newStatus);
    }
  }

  return (
    <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full animate-in fade-in-0 zoom-in-95 duration-500 card-hover-lift focus-within:ring-2 focus-within:ring-slate-400 dark:focus-within:ring-slate-600">
      <CardContent className="p-4 sm:p-5 sm:p-6 space-y-4 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            className="flex-1 space-y-2 text-left min-w-0 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 p-1"
            aria-label={`Edit task: ${task.title}`}
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-50 line-clamp-2 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
              {renderHighlightedText(task.title)}
            </h3>
            {task.description && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {renderHighlightedText(task.description)}
              </p>
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 active:scale-95"
                aria-label="Task menu"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in fade-in-0 zoom-in-95 duration-200">
              <DropdownMenuItem
                onClick={() => onEdit?.(task)}
                className="cursor-pointer transition-colors"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(task)}
                className="text-red-600 dark:text-red-400 cursor-pointer transition-colors"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge className={`${priorityConfig_value.className} transition-all duration-300`}>
            {priorityConfig_value.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge className={`${statusConfig_value.className} cursor-pointer transition-all duration-300 hover:shadow-md active:scale-95`}>
                {statusConfig_value.label}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="animate-in fade-in-0 zoom-in-95 duration-200">
              {statuses.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`cursor-pointer transition-colors ${status === task.status ? "bg-slate-100 dark:bg-slate-800 font-semibold" : ""}`}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 text-xs">
          {task.dueDate && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500">
            <Clock className="h-4 w-4" />
            <span>Created: {formatDate(task.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
