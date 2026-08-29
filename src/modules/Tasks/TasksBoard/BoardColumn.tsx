import { useDroppable } from "@dnd-kit/react"

import { TASK_STATUS_LABELS } from "@/constants/tasks"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "@/types/task"

import { DraggableTaskCard } from "./DraggableTaskCard"

type BoardColumnProps = {
  status: TaskStatus
  tasks: Task[]
}

export const BoardColumn = ({ status, tasks }: BoardColumnProps) => {
  const { ref, isDropTarget } = useDroppable({ id: status })

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/40 transition-colors",
        isDropTarget && "border-primary/40 bg-primary/5",
      )}
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <h3 className="text-sm font-semibold">{TASK_STATUS_LABELS[status]}</h3>
        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-background px-1.5 text-xs font-medium text-muted-foreground">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
        {tasks.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <DraggableTaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}
