import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createTask } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
