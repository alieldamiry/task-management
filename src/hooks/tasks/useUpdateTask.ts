import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateTask } from "@/services/tasks"
import type { Task } from "@/types/task"

import { taskKeys } from "./taskKeys"

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all })

      const snapshot = queryClient.getQueriesData<Task[]>({
        queryKey: taskKeys.all,
      })
      console.log("snapshot", snapshot)

      queryClient.setQueriesData<Task[]>({ queryKey: taskKeys.all }, (tasks) =>
        tasks?.map((task) =>
          task.id === updated.id ? { ...task, ...updated } : task,
        ),
      )

      return { snapshot }
    },
    onError: (_error, _updated, context) => {
      context?.snapshot.forEach(([key, tasks]) => {
        queryClient.setQueryData(key, tasks)
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
