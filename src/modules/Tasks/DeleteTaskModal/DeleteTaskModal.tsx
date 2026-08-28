import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Task } from "@/modules/Tasks/types"

import { useDeleteTask } from "./useDeleteTask"

type DeleteTaskModalProps = {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DeleteTaskModal = ({
  task,
  open,
  onOpenChange,
}: DeleteTaskModalProps) => {
  const { mutateAsync, isPending, isError, error, reset } = useDeleteTask()

  const handleOpenChange = (next: boolean) => {
    if (!next) reset()
    onOpenChange(next)
  }

  const handleDelete = async () => {
    if (!task) return

    try {
      await mutateAsync(task.id)
      onOpenChange(false)
      reset()
    } catch {
      // error surfaced via isError
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Delete Task
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            {task ? ` "${task.title}"` : " this task"}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {isError && (
          <p className="text-sm text-destructive">{error.message}</p>
        )}

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" type="button" disabled={isPending} />
            }
          >
            Cancel
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
