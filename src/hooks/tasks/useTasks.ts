import { useQuery } from "@tanstack/react-query"

import { getTasks } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useTasks = () =>
  useQuery({
    queryKey: taskKeys.list(),
    queryFn: getTasks,
  })
