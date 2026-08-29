import { useDraggable } from "@dnd-kit/react"

import type { Task } from "@/types/task"

import { TaskCard } from "./TaskCard"

type DraggableTaskCardProps = {
  task: Task
}

export const DraggableTaskCard = ({ task }: DraggableTaskCardProps) => {
  const { ref, handleRef, isDragging } = useDraggable({ id: task.id })

  return (
    <TaskCard
      task={task}
      cardRef={ref}
      handleRef={handleRef}
      dragging={isDragging}
    />
  )
}
