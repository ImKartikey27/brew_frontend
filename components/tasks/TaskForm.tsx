"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/types";
import { createTaskSchema, type CreateTaskInput } from "@/lib/validations/task";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TaskForm({
  task,
  onSubmit,
  onCancel,
  isLoading,
}: TaskFormProps): React.ReactElement {
  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description,
      priority: task?.priority || "medium",
      status: task?.status || "To Do",
      dueDate: task?.dueDate,
    },
  });

  const isEditing = !!task;

  async function handleSubmit(values: CreateTaskInput): Promise<void> {
    try {
      await onSubmit(values);
    } catch (error) {
      // Error handling is done at component level
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 sm:space-y-6 animate-in fade-in-0 duration-300">
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Title
                <span className="text-red-500 ml-1" aria-label="required">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title"
                  disabled={isLoading}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={fieldState.error ? "title-error" : undefined}
                  className={fieldState.error ? "border-red-500" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage id="title-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Description
                <span className="text-slate-400 text-xs ml-1">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description"
                  disabled={isLoading}
                  rows={4}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={fieldState.error ? "description-error" : undefined}
                  className={fieldState.error ? "border-red-500" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage id="description-error" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Priority
                  <span className="text-red-500 ml-1" aria-label="required">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger
                      aria-label="Select priority"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? "priority-error" : undefined}
                      className={fieldState.error ? "border-red-500" : ""}
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage id="priority-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Status
                  <span className="text-red-500 ml-1" aria-label="required">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger
                      aria-label="Select status"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? "status-error" : undefined}
                      className={fieldState.error ? "border-red-500" : ""}
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage id="status-error" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Due Date
                <span className="text-slate-400 text-xs ml-1">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  disabled={isLoading}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={fieldState.error ? "dueDate-error" : undefined}
                  className={fieldState.error ? "border-red-500" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage id="dueDate-error" />
            </FormItem>
          )}
        />

        <div className="flex gap-3 justify-end pt-6 border-t border-slate-200 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Cancel form submission"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            aria-label={isEditing ? "Update task" : "Create task"}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white dark:border-slate-950 border-t-transparent rounded-full animate-spin mr-2" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditing ? "Update Task" : "Create Task"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
