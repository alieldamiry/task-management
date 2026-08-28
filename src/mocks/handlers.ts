import { http, HttpResponse, delay } from "msw"

import type { NewTask, Task, UpdateTask } from "@/modules/Tasks/types"

import { tasks } from "./data/tasks"

export const handlers = [
  http.get("/api/tasks", async () => {
    await delay(500)
    return HttpResponse.json(tasks)
  }),

  http.post("/api/tasks", async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as NewTask

    const newTask: Task = {
      id: tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1,
      status: "to_do",
      title: body.title,
      description: body.description,
      priority: body.priority,
      dueDate: body.dueDate,
    }

    tasks.push(newTask)

    return HttpResponse.json(newTask, { status: 201 })
  }),

  http.patch("/api/tasks/:id", async ({ request, params }) => {
    await delay(500)

    const id = Number(params.id)
    const task = tasks.find((task) => task.id === id)

    if (!task) {
      return HttpResponse.json({ message: "Task not found" }, { status: 404 })
    }

    const body = (await request.json()) as Partial<Omit<UpdateTask, "id">>

    Object.assign(task, body)

    return HttpResponse.json(task)
  }),
]
