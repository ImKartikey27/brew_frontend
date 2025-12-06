export * from "./auth";

// Task validation schemas
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["To Do", "In Progress", "Done"]),
  dueDate: z.string().optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;
