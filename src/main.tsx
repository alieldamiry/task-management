import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import './index.css'
import App from './App.tsx'
import { enableMocking } from './mocks/enableMocking'

const queryClient = new QueryClient()

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ToastContainer position="bottom-right" autoClose={3000} newestOnTop />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  )
})
