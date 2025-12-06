"use client";

import { useState } from "react";
import { Task } from "@/types";
import { CreateTaskInput } from "@/lib/validations/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";

interface TaskDialogProps {
  open: boolean;
  task?: Task;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  isLoading?: boolean;
}

export function TaskDialog({
  open,
  task,
  onOpenChange,
  onSubmit,
  isLoading,
}: TaskDialogProps): React.ReactElement {
  const isEditing = !!task;

  async function handleSubmit(data: CreateTaskInput): Promise<void> {
    await onSubmit(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-4 sm:p-6 transition-all duration-300 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 sm:slide-in-from-center">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {isEditing ? "Update task details below" : "Add a new task to your list"}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-220px)] sm:max-h-[calc(100vh-240px)] pr-2">
          <TaskForm
            task={task}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
