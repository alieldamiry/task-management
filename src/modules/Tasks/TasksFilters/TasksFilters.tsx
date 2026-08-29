import { X } from "lucide-react"
import { useLocation } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  TASK_STATUSES,
} from "@/constants/tasks"

import type { TaskPriority, TaskStatus } from "@/types/task"

import { useTaskFilters } from "./useTaskFilters"

export const TasksFilters = () => {
  const { filters, setFilter, clearFilters, hasActiveFilters } = useTaskFilters()
  const { pathname } = useLocation()
  const isKanbanView = pathname === "/kanban"

  return (
    <div className="flex flex-wrap items-end gap-3 py-2">
      {!isKanbanView && (
        <div className="flex flex-col gap-1">
          <Label htmlFor="filter-status">Status</Label>
          <Select
            value={filters.status ?? null}
            onValueChange={(value: string | null) =>
              setFilter("status", value ?? undefined)
            }
          >
            <SelectTrigger id="filter-status" className="w-40">
              <SelectValue placeholder="Any status">
                {(value: TaskStatus | null) =>
                  value ? TASK_STATUS_LABELS[value] : "Any status"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Any status</SelectItem>
              {TASK_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {TASK_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <Label htmlFor="filter-priority">Priority</Label>
        <Select
          value={filters.priority ?? null}
          onValueChange={(value: string | null) =>
            setFilter("priority", value ?? undefined)
          }
        >
          <SelectTrigger id="filter-priority" className="w-40">
            <SelectValue placeholder="Any priority">
              {(value: TaskPriority | null) =>
                value ? TASK_PRIORITY_LABELS[value] : "Any priority"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Any priority</SelectItem>
            {TASK_PRIORITIES.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {TASK_PRIORITY_LABELS[priority]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="filter-due-from">Due from</Label>
        <Input
          id="filter-due-from"
          type="date"
          className="w-40"
          value={filters.dueFrom ?? ""}
          max={filters.dueTo || undefined}
          onChange={(event) =>
            setFilter("dueFrom", event.target.value || undefined)
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="filter-due-to">Due to</Label>
        <Input
          id="filter-due-to"
          type="date"
          className="w-40"
          value={filters.dueTo ?? ""}
          min={filters.dueFrom || undefined}
          onChange={(event) =>
            setFilter("dueTo", event.target.value || undefined)
          }
        />
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" onClick={clearFilters}>
          <X />
          Clear filters
        </Button>
      )}
    </div>
  )
}
