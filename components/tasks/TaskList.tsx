"use client";

import { Task, Status } from "@/types";
import { TaskCard } from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (task: Task, status: Status) => Promise<void>;
  isEmpty?: boolean;
  searchQuery?: string;
}

export function TaskList({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
  isEmpty,
  searchQuery,
}: TaskListProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in-0 duration-300">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-40 sm:h-44 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (isEmpty || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in-0 duration-300">
        <div className="space-y-2 text-center px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-950 dark:text-slate-50">
            No tasks found
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Create your first task to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, index) => (
        <div key={task._id} style={{ animationDelay: `${index * 50}ms` }}>
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            searchQuery={searchQuery}
          />
        </div>
      ))}
    </div>
  );
}
