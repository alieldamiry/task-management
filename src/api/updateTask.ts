import type { Task, UpdateTask } from "@/modules/Tasks/types"

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
