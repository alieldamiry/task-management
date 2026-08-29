import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { createTask } from "@/services/tasks"

import { taskKeys } from "./taskKeys"

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
      toast.success("Task created")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task")
    },
  })
}
