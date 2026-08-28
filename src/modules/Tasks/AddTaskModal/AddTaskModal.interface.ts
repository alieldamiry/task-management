import type { z } from "zod"

import type { addTaskSchema } from "./AddTaskModal.schema"

export type AddTaskFormValues = z.infer<typeof addTaskSchema>

export type Priority = AddTaskFormValues["priority"]
export type UseAddTaskFormOptions = {
  onSubmitSuccess?: () => void
}