import { KanbanSquare, LayoutList } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type TasksView = "list" | "kanban"

type ViewToggleProps = {
  value: TasksView
  onChange: (view: TasksView) => void
}

const OPTIONS: { value: TasksView; label: string; icon: typeof LayoutList }[] = [
  { value: "list", label: "List", icon: LayoutList },
  { value: "kanban", label: "Kanban", icon: KanbanSquare },
]

export const ViewToggle = ({ value, onChange }: ViewToggleProps) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
      {OPTIONS.map(({ value: option, label, icon: Icon }) => (
        <Button
          key={option}
          type="button"
          size="sm"
          variant={value === option ? "default" : "ghost"}
          aria-pressed={value === option}
          className={cn(value !== option && "text-muted-foreground")}
          onClick={() => onChange(option)}
        >
          <Icon />
          {label}
        </Button>
      ))}
    </div>
  )
}
