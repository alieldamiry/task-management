import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateTask } from "@/api/updateTask"

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] })
    },
  })
}
