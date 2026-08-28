import { Spinner } from "@/components/ui/spinner"
import { TASK_STATUSES, useTaskFilters } from "@/modules/Tasks/TasksFilters"
import { useTasks } from "@/hooks/tasks"
import type { Task, TaskStatus } from "@/types/task"

import { BoardColumn } from "./BoardColumn"

export const TasksBoard = () => {
  const { filters } = useTaskFilters()
  const { data: tasks = [], isPending, isError, error } = useTasks(filters)

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (isError) {
    return <p className="py-16 text-center text-destructive">{error.message}</p>
  }

  const tasksByStatus = TASK_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status)
      console.log({acc, status, tasks: acc[status]})
      return acc
    },
    {} as Record<TaskStatus, Task[]>,
  )


  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {TASK_STATUSES.map((status) => (
        <BoardColumn
          key={status}
          status={status}
          tasks={tasksByStatus[status]}
        />
      ))}
    </div>
  )
}
