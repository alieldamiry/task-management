# Task Management

A single-page task manager built with React 19, TypeScript and Vite. Create, edit,
delete, search, filter and drag tasks between statuses from a **list view** or a
**kanban board**. The API is mocked in the browser with [MSW](https://mswjs.io/),
so the app runs end-to-end with no backend.

---

## 1. Quick Start

**Prerequisites:** Node 20+ (developed on 24), Yarn 4.x (the repo ships
`.yarnrc.yml`). npm also works (`package-lock.json` is committed).

```bash
git clone <repo-url>
cd task-management
yarn install
yarn dev        # http://localhost:5173
```

**Environment variables:** none required — the API is a mocked service worker, so
there is nothing to configure locally or in production.

**Commands:**

| Command | What it does |
| ------- | ------------ |
| `yarn dev` | Vite dev server with HMR |
| `yarn build` | Type-check (`tsc -b`) then build to `dist/` |
| `yarn preview` | Serve the built `dist/` locally |
| `yarn lint` | Run ESLint |
| `yarn test` | **Not available** — no tests were written (see Trade-Offs) |

**Deployment:** Vercel. [vercel.json](vercel.json) rewrites all routes to
`index.html` so client-side routing survives refreshes and deep links.

---

## 2. Architectural Decisions

**Structure** — organised by feature: `modules/Tasks/*` holds one folder per
concern (board, list, modals, filters), each co-locating its component, zod schema
and form hook. Generic pieces live in `components/`, the API client in `services/`,
query hooks in `hooks/tasks/`, mock API in `mocks/`.

**State — three deliberate layers:**

| State | Tool | Why |
| ----- | ---- | --- |
| Server / async (task list, mutations) | [TanStack Query](https://tanstack.com/query) | Caching, refetch, loading/error states, optimistic updates. `useUpdateTask` patches the cache with rollback; create/delete invalidate. |
| URL (active view, search, filters) | `react-router` search params | Filters and the list/kanban toggle are shareable and survive refresh; the query key derives from them, so changes refetch automatically. |
| Local UI (theme) | [Zustand](https://github.com/pmndrs/zustand) + `persist` | Tiny, no provider. Persists to `localStorage`; an inline script in `index.html` applies it before first paint. |

No global client store for tasks — server state belongs to TanStack Query.

**Styling** — Tailwind CSS v4 (via `@tailwindcss/vite`, no config file) with
[shadcn/ui](https://ui.shadcn.com/) components vendored into `components/ui/` on
top of headless Base UI primitives, plus `lucide-react` icons and
`cva`/`tailwind-merge` for variants. Dark mode is a `.dark` class toggled by the
store. Owning the component source avoids fighting a theme API.

**Data fetching** — plain `fetch` wrappers in
[src/services/tasks.ts](src/services/tasks.ts) (the single seam to swap for a real
API), consumed through per-operation hooks. MSW handlers implement the REST
contract against an in-memory array with a 500ms delay, and the worker starts in
**every environment** so the deployed demo works without a server.

**Forms** — `react-hook-form` + `zod` via `@hookform/resolvers`.
**Drag & drop** — `@dnd-kit/react`; dropping a card fires an optimistic status
update. **Notifications** — `react-toastify`. **Errors** — a class `ErrorBoundary`
+ `ErrorFallback` wrap the app.

---

## 3. Engineering Trade-Offs (48-hour constraint)

- **No automated tests** — `yarn test` is a no-op. The `services/` + hooks split is
  structured to be testable later (MSW is already a dependency).
- **Mocked API, no backend** — no persistence; tasks reset on reload. Let the full
  feature set ship as a static site.
- **No auth / users / multi-tenancy** — out of scope.
- **No pagination** — the list renders every matching task; filtering and search
  live in the MSW handler.
- **Optimistic updates only for `updateTask`** — create/delete just invalidate and
  refetch, which was simpler and fast enough.
- **Minimal tooling** — recommended-only ESLint, no Prettier/CI.
- **Rough edges** — limited responsive polish on the board, dates as plain strings
  (no date library), no i18n, no keyboard alternative for drag and drop.

---

## 4. Future Scalability & Roadmap

- **Testing:** unit tests for `services/` and hooks, component tests for modals and
  filters (Vitest + Testing Library + MSW), a Playwright smoke suite, and CI
  running lint/build/tests on PRs.
- **Backend:** replace MSW with a real API behind a `VITE_ENABLE_MOCKS` flag (only
  `services/tasks.ts` changes); add server-side pagination + virtualization,
  persisted storage, real accounts and per-user ownership.
- **Features:** column sorting, saved filter views, bulk actions, subtasks, labels,
  assignees, comments, in-column reordering, due-date reminders, calendar view,
  activity log, and undo for destructive actions.
- **Frontend:** route-level code splitting, enable the React Compiler, design
  tokens + Storybook, and Sentry wired into the `ErrorBoundary` and query
  `onError`.
