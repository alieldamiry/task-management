import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { EditTaskModal } from "@/modules/Tasks/EditTaskModal"
import { DeleteTaskModal } from "@/modules/Tasks/DeleteTaskModal"
import type { Task, TaskPriority } from "@/types/task"

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  low: "border-transparent bg-muted text-muted-foreground",
  medium: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  high: "border-transparent bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
}

type TaskCardProps = {
  task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => (
  <div className="rounded-lg border border-border bg-card p-3 shadow-xs">
    <div className="flex items-start justify-between gap-2">
      <p className="text-sm font-medium leading-snug">{task.title}</p>
      <div className="-mr-1 -mt-1 flex shrink-0 items-center">
        <EditTaskModal task={task} />
        <DeleteTaskModal task={task} />
      </div>
    </div>

    {task.description && (
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {task.description}
      </p>
    )}

    <div className="mt-3 flex items-center justify-between gap-2">
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
          PRIORITY_STYLES[task.priority],
        )}
      >
        {task.priority}
      </span>
      {task.dueDate && (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {task.dueDate}
        </span>
      )}
    </div>
  </div>
)
