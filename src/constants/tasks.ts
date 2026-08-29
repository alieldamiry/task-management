import type { TaskPriority, TaskStatus } from "@/types/task"

export const TASK_STATUSES: TaskStatus[] = [
  "to_do",
  "in_progress",
  "in_review",
  "done",
]

export const TASK_PRIORITIES: TaskPriority[] = ["low", "medium", "high"]

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  to_do: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
}

export const TASK_PRIORITY_BADGE_STYLES: Record<TaskPriority, string> = {
  low: "border-transparent bg-muted text-muted-foreground",
  medium:
    "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  high: "border-transparent bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
}
