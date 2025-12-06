"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  open: boolean;
  taskTitle: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export function DeleteDialog({
  open,
  taskTitle,
  onOpenChange,
  onConfirm,
  isLoading,
}: DeleteDialogProps): React.ReactElement {
  async function handleConfirm(): Promise<void> {
    await onConfirm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-4 sm:p-6 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 sm:slide-in-from-center">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-lg sm:text-xl font-bold">Delete Task</DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Are you sure you want to delete <span className="font-semibold text-slate-950 dark:text-slate-50 break-words">"{taskTitle}"</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            aria-label="Cancel deletion"
            className="transition-all active:scale-95 flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            aria-label="Confirm deletion"
            className="transition-all active:scale-95 flex-1 sm:flex-none"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white dark:border-red-900 border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
