import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getTasks, type TaskFilters } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useTasks = (filters?: TaskFilters) =>
  useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => getTasks(filters),
    placeholderData: keepPreviousData,
  })
