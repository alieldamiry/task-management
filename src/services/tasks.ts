import type { NewTask, Task, UpdateTask } from "@/types/task"

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks")

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks (${response.status})`)
  }

  return (await response.json()) as Task[]
}

export async function createTask(input: NewTask): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(`Failed to create task (${response.status})`)
  }

  return (await response.json()) as Task
}

export async function updateTask({ id, ...input }: UpdateTask): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(`Failed to update task (${response.status})`)
  }

  return (await response.json()) as Task
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete task (${response.status})`)
  }
}
