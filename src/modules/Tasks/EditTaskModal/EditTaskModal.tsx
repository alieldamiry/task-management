
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SquarePen } from "lucide-react"
import { useState } from "react"
import { EditTaskForm } from "./EditTaskForm"
import type { EditTaskModalProps } from "./EditTaskModal.interface"

export const EditTaskModal = ({
  task,
}: EditTaskModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button
        variant="ghost"
        size="sm"
      >
        <SquarePen />
      </Button>}>

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Task</DialogTitle>
          <DialogDescription>
            Update the task details below and save your changes.
          </DialogDescription>
        </DialogHeader>

        {task && (
          <EditTaskForm
            key={task.id}
            task={task}
            onSubmitSuccess={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

