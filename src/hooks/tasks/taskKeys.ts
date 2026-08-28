import type { TaskFilters } from "@/services/tasks"

export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters?: TaskFilters) =>
    [...taskKeys.all, "list", filters ?? {}] as const,
}
