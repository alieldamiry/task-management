import type { Task } from "@/types/task"

export const tasks: Task[] = [
  {
    id: 1,
    title: "Set up project repository",
    description:
      "Initialize Git repository, configure branch protection rules, and add README with setup instructions.",
    priority: "high",
    status: "done",
    dueDate: "2026-08-20",
  },
  {
    id: 2,
    title: "Design database schema",
    description:
      "Define tables, relationships, and indexes for the core data models.",
    priority: "high",
    status: "done",
    dueDate: "2026-08-22",
  },
  {
    id: 3,
    title: "Implement user authentication",
    description: "Add login, registration, and JWT-based session handling.",
    priority: "high",
    status: "in_progress",
    dueDate: "2026-09-02",
  },
  {
    id: 4,
    title: "Build task list UI component",
    description:
      "Create a reusable, filterable list component to display tasks with status badges.",
    priority: "medium",
    status: "in_progress",
    dueDate: "2026-09-05",
  },
  {
    id: 5,
    title: "Write unit tests for API endpoints",
    description:
      "Cover CRUD operations for tasks with edge cases and error handling.",
    priority: "medium",
    status: "to_do",
    dueDate: "2026-09-10",
  },
  {
    id: 6,
    title: "Add due date notifications",
    description:
      "Send email or push reminders 24 hours before a task's due date.",
    priority: "low",
    status: "to_do",
    dueDate: "2026-09-15",
  },
  {
    id: 7,
    title: "Fix pagination bug on dashboard",
    description:
      "Page size resets to default when navigating back from a task detail view.",
    priority: "medium",
    status: "in_review",
    dueDate: "2026-08-30",
  },
  {
    id: 8,
    title: "Update documentation",
    description:
      "Document new API endpoints and update the onboarding guide for contributors.",
    priority: "low",
    status: "to_do",
    dueDate: "2026-09-18",
  },
]
