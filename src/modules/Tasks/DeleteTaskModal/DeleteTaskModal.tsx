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
import type { Task } from "@/modules/Tasks/types"

import { useDeleteTask } from "./useDeleteTask"
import { Trash2 } from "lucide-react"
import { useState } from "react"

type DeleteTaskModalProps = {
  task: Task | null
}

export const DeleteTaskModal = ({
  task,
}: DeleteTaskModalProps) => {
  const { mutateAsync, isPending, isError, error, reset } = useDeleteTask()
const [open, setOpen] = useState(false)
  const handleOpenChange = (next: boolean) => {
    if (!next) reset()
    setOpen(next)
  }

  const handleDelete = async () => {
    if (!task) return

    try {
      await mutateAsync(task.id)
      setOpen(false)
      reset()
    } catch {
      // error surfaced via isError
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={
        <Button
          variant="ghost"
          size="sm"
        >
          <Trash2 className="text-destructive" />
        </Button>
      }></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Delete Task
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            {task ? <span className="font-bold"> "{task.title}" </span> : "this task"}? This action cannot be
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
