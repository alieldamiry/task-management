import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import { TasksContainer } from './modules/Tasks/TasksContainer'
import { TasksList } from './modules/Tasks/TasksList/TasksList'
import { TasksBoard } from './modules/Tasks/TasksBoard'

function App() {

  return (
    <Routes>
      <Route element={<TasksContainer />}>
        <Route index element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<TasksList />} />
        <Route path="/kanban" element={<TasksBoard />} />
      </Route>
    </Routes>
  )
}

export default App
