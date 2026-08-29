import type { NewTask, Task, TaskPriority, TaskStatus, UpdateTask } from "@/types/task"

export type TaskFilters = {
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueFrom?: string
  dueTo?: string
}

export async function getTasks(filters?: TaskFilters): Promise<Task[]> {
  const query = new URLSearchParams()

  if (filters?.search) {
    query.set("search", filters.search)
  }

  if (filters?.status) {
    query.set("status", filters.status)
  }

  if (filters?.priority) {
    query.set("priority", filters.priority)
  }

  if (filters?.dueFrom) {
    query.set("dueFrom", filters.dueFrom)
  }

  if (filters?.dueTo) {
    query.set("dueTo", filters.dueTo)
  }

  const queryString = query.toString()
  const response = await fetch(
    `/api/tasks${queryString ? `?${queryString}` : ""}`,
  )

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
