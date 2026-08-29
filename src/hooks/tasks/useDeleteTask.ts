import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { deleteTask } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
      toast.success("Task deleted")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete task")
    },
  })
}
