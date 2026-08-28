import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateTask } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
