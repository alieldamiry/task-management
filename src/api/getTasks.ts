import type { Task } from "@/modules/Tasks/types"

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks")

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks (${response.status})`)
  }

  return (await response.json()) as Task[]
}
