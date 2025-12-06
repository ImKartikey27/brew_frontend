"use client";

import { Priority, Status } from "@/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TaskFiltersProps {
  selectedPriority?: Priority;
  selectedStatus?: Status;
  onPriorityChange: (priority?: Priority) => void;
  onStatusChange: (status?: Status) => void;
  onClear: () => void;
}

const priorities: Array<{ value: Priority; label: string }> = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const statuses: Array<{ value: Status; label: string }> = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

export function TaskFilters({
  selectedPriority,
  selectedStatus,
  onPriorityChange,
  onStatusChange,
  onClear,
}: TaskFiltersProps): React.ReactElement {
  const hasActiveFilters = selectedPriority || selectedStatus;

  return (
    <div className="space-y-4 animate-in fade-in-0 duration-300">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-slate-50 mb-2">
            Priority
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedPriority ? "default" : "outline"}
              size="sm"
              onClick={() => onPriorityChange(undefined)}
              className="transition-all duration-200 active:scale-95"
              aria-pressed={!selectedPriority}
              aria-label="All priorities"
            >
              All
            </Button>
            {priorities.map((priority) => (
              <Button
                key={priority.value}
                variant={selectedPriority === priority.value ? "default" : "outline"}
                size="sm"
                onClick={() => onPriorityChange(priority.value)}
                className="transition-all duration-200 active:scale-95"
                aria-pressed={selectedPriority === priority.value}
                aria-label={`Filter by ${priority.label} priority`}
              >
                {priority.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-slate-50 mb-2">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedStatus ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange(undefined)}
              className="transition-all duration-200 active:scale-95"
              aria-pressed={!selectedStatus}
              aria-label="All statuses"
            >
              All
            </Button>
            {statuses.map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(status.value)}
                className="transition-all duration-200 active:scale-95"
                aria-pressed={selectedStatus === status.value}
                aria-label={`Filter by ${status.label} status`}
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="w-full transition-all duration-200 active:scale-95 animate-in fade-in-0 zoom-in-95"
          aria-label="Clear all filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
