export type TaskStatus = "to_do" | "in_progress" | "in_review" | "done"

export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
}
