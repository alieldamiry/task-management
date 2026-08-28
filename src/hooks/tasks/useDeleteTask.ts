import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteTask } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
