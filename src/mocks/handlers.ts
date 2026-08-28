import { http, HttpResponse, delay } from "msw"

import { tasks } from "./data/tasks"

export const handlers = [
  http.get("/api/tasks", async () => {
    await delay(500)
    return HttpResponse.json(tasks)
  }),
]
