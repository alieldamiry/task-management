import type { NewTask, Task } from "@/modules/Tasks/types"

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
