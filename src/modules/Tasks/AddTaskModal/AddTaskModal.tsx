import { useState } from "react"
import { Controller } from "react-hook-form"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TASK_PRIORITIES, TASK_PRIORITY_LABELS } from "@/constants/tasks"

import { useAddTaskForm } from "./useAddTaskForm"

export const AddTaskModal = () => {
  const [open, setOpen] = useState(false)
  const { register, control, errors, onSubmit, isSubmitting, submitError } =
    useAddTaskForm({
      onSubmitSuccess: () => setOpen(false),
    })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus />
            Add Task
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add Task</DialogTitle>
          <DialogDescription>
            Create a new task by filling out the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Task title"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What needs to be done?"
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_PRIORITIES.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {TASK_PRIORITY_LABELS[priority]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && (
              <p className="text-sm text-destructive">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="due_date">Due date</Label>
            <Input
              id="due_date"
              type="date"
              aria-invalid={!!errors.due_date}
              {...register("due_date")}
            />
            {errors.due_date && (
              <p className="text-sm text-destructive">
                {errors.due_date.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-destructive">{submitError.message}</p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" type="button" disabled={isSubmitting} />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
