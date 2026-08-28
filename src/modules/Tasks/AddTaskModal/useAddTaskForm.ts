import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { AddTaskFormValues, UseAddTaskFormOptions } from "./AddTaskModal.interface"
import { addTaskSchema } from "./AddTaskModal.schema"
import { useCreateTask } from "./useCreateTask"

export const useAddTaskForm = ({ onSubmitSuccess }: UseAddTaskFormOptions = {}) => {
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      due_date: "",
    },
  })

  const { mutateAsync, isPending, isError, error } = useCreateTask()

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutateAsync({
        title: values.title,
        description: values.description,
        priority: values.priority,
        dueDate: values.due_date,
      })
      form.reset()
      onSubmitSuccess?.()
    } catch {
      // error surfaced via submitError
    }
  })

  return {
    register: form.register,
    control: form.control,
    errors: form.formState.errors,
    onSubmit,
    isSubmitting: isPending,
    submitError: isError ? error : null,
  }
}
