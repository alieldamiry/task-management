import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router"

import { TASK_PRIORITIES, TASK_STATUSES } from "@/constants/tasks"
import type { TaskFilters } from "@/services/tasks"
import type { TaskPriority, TaskStatus } from "@/types/task"

const isStatus = (value: string | null): value is TaskStatus =>
  !!value && (TASK_STATUSES as string[]).includes(value)

const isPriority = (value: string | null): value is TaskPriority =>
  !!value && (TASK_PRIORITIES as string[]).includes(value)

export const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<TaskFilters>(() => {
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const dueFrom = searchParams.get("dueFrom") ?? undefined
    const dueTo = searchParams.get("dueTo") ?? undefined

    return {
      search: searchParams.get("search") ?? undefined,
      status: isStatus(status) ? status : undefined,
      priority: isPriority(priority) ? priority : undefined,
      dueFrom,
      dueTo,
    }
  }, [searchParams])

  const setFilter = useCallback(
    (key: keyof TaskFilters, value: string | undefined) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)

        if (value) {
          next.set(key, value)
        } else {
          next.delete(key)
        }

        return next
      })
    },
    [setSearchParams],
  )

  const clearFilters = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete("status")
      next.delete("priority")
      next.delete("dueFrom")
      next.delete("dueTo")
      return next
    })
  }, [setSearchParams])

  const hasActiveFilters = Boolean(
    filters.status || filters.priority || filters.dueFrom || filters.dueTo,
  )

  return { filters, setFilter, clearFilters, hasActiveFilters }
}
