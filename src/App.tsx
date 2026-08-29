import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { TasksContainer } from './modules/Tasks/TasksContainer'
import { TasksList } from './modules/Tasks/TasksList/TasksList'
import { TasksBoard } from './modules/Tasks/TasksBoard'
import { useThemeStore } from './stores/useThemeStore'

function App() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <>
      <Routes>
        <Route element={<TasksContainer />}>
          <Route index element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<TasksList />} />
          <Route path="/kanban" element={<TasksBoard />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        theme={theme}
      />
    </>
  )
}

export default App
