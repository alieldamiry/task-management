import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { Task } from "@/types/task"
import { useUpdateTask } from "@/hooks/tasks"

import type {
  EditTaskFormValues,
  UseEditTaskFormOptions,
} from "./EditTaskModal.interface"
import { editTaskSchema } from "./EditTaskModal.schema"

const toFormValues = (task: Task): EditTaskFormValues => ({
  title: task.title,
  description: task.description,
  priority: task.priority,
  status: task.status,
  due_date: task.dueDate,
})

export const useEditTaskForm = ({
  task,
  onSubmitSuccess,
}: UseEditTaskFormOptions) => {
  const form = useForm<EditTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    values: toFormValues(task),
  })

  const { mutateAsync, isPending, isError, error } = useUpdateTask()

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutateAsync({
        id: task.id,
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status,
        dueDate: values.due_date,
      })
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
