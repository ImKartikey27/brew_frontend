"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Task, Priority, Status } from "@/types";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTasks, useSearchTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/lib/hooks/useTasks";
import { CreateTaskInput } from "@/lib/validations/task";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { TaskSearch } from "@/components/tasks/TaskSearch";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskDialog } from "@/components/tasks/TaskDialog";
import { DeleteDialog } from "@/components/tasks/DeleteDialog";
import { Plus, AlertCircle, RefreshCw } from "lucide-react";
import { useKeyboardShortcuts } from "@/lib/hooks/useKeyboardShortcuts";

export default function DashboardPage(): React.ReactElement {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Dialog states
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deleteTaskTarget, setDeleteTaskTarget] = useState<Task | undefined>();

  const filters = {
    priority: selectedPriority,
    status: selectedStatus,
  };

  const { tasks: tasksData, isLoading: isLoadingTasks, error: tasksError, refetch: refetchTasks } = useTasks(
    selectedPriority || selectedStatus ? filters : undefined
  );

  const { tasks: searchData, isLoading: isLoadingSearch, error: searchError, refetch: refetchSearch } = useSearchTasks(
    searchQuery,
    selectedPriority || selectedStatus ? filters : undefined
  );

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const tasks = searchQuery ? searchData : tasksData;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingTasks;

  // Keyboard shortcuts
  const handleNewTask = useCallback(() => {
    handleOpenCreateDialog();
  }, []);

  useKeyboardShortcuts([
    {
      key: "n",
      metaKey: true,
      action: handleNewTask,
      description: "Create new task",
    },
    {
      key: "n",
      ctrlKey: true,
      action: handleNewTask,
      description: "Create new task (Windows/Linux)",
    },
  ]);

  function handleClearFilters(): void {
    setSelectedPriority(undefined);
    setSelectedStatus(undefined);
  }

  function handleOpenCreateDialog(): void {
    setEditingTask(undefined);
    setTaskDialogOpen(true);
  }

  function handleOpenEditDialog(task: Task): void {
    setEditingTask(task);
    setTaskDialogOpen(true);
  }

  function handleOpenDeleteDialog(task: Task): void {
    setDeleteTaskTarget(task);
    setDeleteDialogOpen(true);
  }

  async function handleSubmitTask(data: CreateTaskInput): Promise<void> {
    try {
      if (editingTask) {
        await updateTaskMutation.mutateAsync({
          id: editingTask._id,
          data,
        });
        toast.success("Task updated successfully");
      } else {
        await createTaskMutation.mutateAsync(data);
        toast.success("Task created successfully");
      }
      setTaskDialogOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save task";
      toast.error(errorMessage);
    }
  }

  async function handleDeleteTask(): Promise<void> {
    if (!deleteTaskTarget) return;

    try {
      await deleteTaskMutation.mutateAsync(deleteTaskTarget._id);
      toast.success("Task deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete task";
      toast.error(errorMessage);
    }
  }

  async function handleStatusChange(task: Task, status: Status): Promise<void> {
    try {
      await updateTaskMutation.mutateAsync({
        id: task._id,
        data: { status },
      });
      toast.success("Task status updated");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update status";
      toast.error(errorMessage);
    }
  }

  // Show loading while checking auth
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100"></div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-200 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" role="main" aria-label="Tasks dashboard">
        <div className="sr-only">
          Use Cmd+N or Ctrl+N to create a new task
        </div>
        <div className="space-y-6 sm:space-y-8 animate-in fade-in-0 duration-500">
          {/* Network Error State */}
          {((searchQuery && searchError) || (!searchQuery && tasksError && !isLoadingTasks)) && (
            <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 flex items-start gap-4 animate-in fade-in-0 slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-red-900 dark:text-red-100">Failed to load tasks</h3>
                <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                  {searchQuery ? "Search failed. " : ""}Please check your connection and try again
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (searchQuery) {
                    refetchSearch();
                  } else {
                    refetchTasks();
                  }
                }}
                className="flex-shrink-0 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Retry</span>
              </Button>
            </div>
          )}

          {/* Search & Create Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-in fade-in-0 slide-in-from-top-2 duration-500">
            <div className="flex-1 min-w-0">
              <TaskSearch
                value={searchQuery}
                onChange={setSearchQuery}
                isLoading={isLoading && searchQuery.length > 0}
              />
            </div>
            <Button
              onClick={handleOpenCreateDialog}
              className="gap-2 transition-all active:scale-95 font-medium shadow-sm hover:shadow-md"
              size="default"
              aria-label="Create new task"
            >
              <Plus className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-4">
            {/* Filters Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <Card className="p-6 sticky top-[calc(var(--header-height,80px)+2rem)] h-fit animate-in fade-in-0 duration-500">
                <h2 className="font-semibold text-slate-950 dark:text-slate-50 mb-4 text-lg">
                  Filters
                </h2>
                <TaskFilters
                  selectedPriority={selectedPriority}
                  selectedStatus={selectedStatus}
                  onPriorityChange={setSelectedPriority}
                  onStatusChange={setSelectedStatus}
                  onClear={handleClearFilters}
                />
              </Card>
            </div>

            {/* Mobile Filters & Task List */}
            <div className="lg:col-span-3 space-y-6">
              {/* Mobile Filters - Collapsible */}
              <div className="lg:hidden">
                <details className="group peer">
                  <summary className="cursor-pointer font-semibold text-slate-950 dark:text-slate-50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-50 dark:bg-slate-900 rounded-lg transition-all duration-200 select-none list-none flex items-center justify-between gap-2 active:scale-95">
                    <span>Filters</span>
                    <span className="text-lg group-open:rotate-180 transition-transform duration-300">›</span>
                  </summary>
                  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <TaskFilters
                      selectedPriority={selectedPriority}
                      selectedStatus={selectedStatus}
                      onPriorityChange={setSelectedPriority}
                      onStatusChange={setSelectedStatus}
                      onClear={handleClearFilters}
                    />
                  </div>
                </details>
              </div>

              {/* Task List Header */}
              <div className="flex items-center justify-between gap-4 animate-in fade-in-0 duration-500">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-950 dark:text-slate-50">
                  {searchQuery ? "Search Results" : "All Tasks"}
                </h2>
                {tasks.length > 0 && !isLoading && (
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full flex-shrink-0">
                    {tasks.length}
                  </span>
                )}
              </div>

              {/* No Results State */}
              {(tasks.length === 0 && !isLoading && searchQuery) && (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in-0 zoom-in-95 duration-300">
                  <AlertCircle className="h-8 w-8 text-slate-400 dark:text-slate-600 mb-3" />
                  <p className="text-base sm:text-lg font-semibold text-slate-950 dark:text-slate-50 text-center">
                    No results for <span className="text-slate-600 dark:text-slate-400">"{searchQuery}"</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 text-center px-4">
                    Try a different search term or adjust your filters
                  </p>
                </div>
              )}

              {/* Task Grid */}
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onEdit={handleOpenEditDialog}
                onDelete={handleOpenDeleteDialog}
                onStatusChange={handleStatusChange}
                isEmpty={tasks.length === 0 && !isLoading && !searchQuery}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <TaskDialog
        open={taskDialogOpen}
        task={editingTask}
        onOpenChange={setTaskDialogOpen}
        onSubmit={handleSubmitTask}
        isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        taskTitle={deleteTaskTarget?.title || ""}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteTask}
        isLoading={deleteTaskMutation.isPending}
      />
    </div>
  );
}
