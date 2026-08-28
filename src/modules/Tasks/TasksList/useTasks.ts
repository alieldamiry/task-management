import { useQuery } from "@tanstack/react-query"

import { getTasks } from "@/api/getTasks"

export const useTasks = () =>
  useQuery({
    queryKey: ["all-tasks"],
    queryFn: getTasks,
  })
