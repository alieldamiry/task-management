import { KanbanSquare, LayoutList } from "lucide-react"
import { NavLink } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const OPTIONS = [
  { to: "/list", label: "List", icon: LayoutList },
  { to: "/kanban", label: "Kanban", icon: KanbanSquare },
]

export const ViewToggle = () => {
  // keep the current filters/search query string when switching views

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
      {OPTIONS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              buttonVariants({
                variant: isActive ? "default" : "ghost",
                size: "sm",
              }),
              !isActive && "text-muted-foreground",
            )
          }
        >
          <Icon />
          {label}
        </NavLink>
      ))}
    </div>
  )
}
