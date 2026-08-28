import { z } from "zod"

export const addTaskSchema = z.object({
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
  due_date: z
    .string()
    .min(1, "Due date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date")
    .refine((v) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return new Date(v) >= today
    }, "Due date cannot be in the past"),
})
