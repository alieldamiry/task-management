import type { z } from "zod"

import type { Task } from "@/modules/Tasks/types"

import type { editTaskSchema } from "./EditTaskModal.schema"

export type EditTaskFormValues = z.infer<typeof editTaskSchema>

export type UseEditTaskFormOptions = {
  task: Task
  onSubmitSuccess?: () => void
}
