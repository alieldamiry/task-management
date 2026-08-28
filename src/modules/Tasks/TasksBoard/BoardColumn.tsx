import type { Task, TaskStatus } from "@/types/task"

import { TaskCard } from "./TaskCard"

const STATUS_LABELS: Record<TaskStatus, string> = {
  to_do: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
}

type BoardColumnProps = {
  status: TaskStatus
  tasks: Task[]
}

export const BoardColumn = ({ status, tasks }: BoardColumnProps) => (
  <div className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/40">
    <div className="flex items-center justify-between px-3 py-2.5">
      <h3 className="text-sm font-semibold">{STATUS_LABELS[status]}</h3>
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
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  </div>
)
