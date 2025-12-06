import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .transform((val) => (val?.trim() === "" ? undefined : val?.trim())),
  priority: z
    .enum(["low", "medium", "high"])
    .optional()
    .default("medium"),
  status: z
    .enum(["To Do", "In Progress", "Done"])
    .optional()
    .default("To Do"),
  dueDate: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export const updateTaskSchema = createTaskSchema.partial().refine(
  (data) => {
    const hasAtLeastOneField = Object.values(data).some(
      (value) => value !== undefined && value !== ""
    );
    return hasAtLeastOneField;
  },
  { message: "At least one field must be updated" }
);

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
