import { z } from "zod"

export const editTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or fewer"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or fewer"),
  priority: z.enum(["low", "medium", "high"], {
    message: "Priority is required",
  }),
  status: z.enum(["to_do", "in_progress", "in_review", "done"], {
    message: "Status is required",
  }),
  due_date: z
    .string()
    .min(1, "Due date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date"),
})
