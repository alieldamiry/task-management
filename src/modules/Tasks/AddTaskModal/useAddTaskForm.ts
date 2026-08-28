import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { AddTaskFormValues, UseAddTaskFormOptions } from "./AddTaskModal.interface"
import { addTaskSchema } from "./AddTaskModal.schema"

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

  const onSubmit = form.handleSubmit((values) => {
    console.log(values)
    form.reset()
    onSubmitSuccess?.()
  })

  return {
    register: form.register,
    control: form.control,
    errors: form.formState.errors,
    onSubmit,
  }
}
