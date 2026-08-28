import { Outlet } from 'react-router'
import { Container } from '@/components/container/container'
import { SearchInput } from '@/modules/Tasks/SearchInput/SearchInput'
import { AddTaskModal } from '@/modules/Tasks/AddTaskModal'
import { TasksFilters } from '@/modules/Tasks/TasksFilters'
import { ViewToggle } from '@/modules/Tasks/ViewToggle'

export const TasksContainer = () => {
  return (
    <Container>
      <div className="flex  items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <ViewToggle />
      </div>
      <div className="flex items-center flex-wrap justify-between py-4">
        <SearchInput />
        <AddTaskModal />
      </div>
      <TasksFilters />
      <Outlet />
    </Container>
  )
}
