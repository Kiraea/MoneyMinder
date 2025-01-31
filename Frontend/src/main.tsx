import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import MainHome from './Pages/MainHome'
import Dashboard from './Components/Dashboard'
import Expenses from './Components/Expenses'
import './index.css'
import Savings from './Components/Savings'
import Incomes from './Components/Incomes'
import SettingsC from './Components/SettingsC'
import { SettingsProvider } from './Context/SettingsContext'
import { AuthContextProvider } from './Context/AuthContext'
import ProtectedRoute from './Pages/ProtectedRoute'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <AuthContextProvider>

    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>

      <Route path="home" element={<ProtectedRoute> <MainHome/> </ProtectedRoute>}>
        <Route index element={<ProtectedRoute> <Dashboard/>   </ProtectedRoute>}/>
        <Route path="expenses" element={<ProtectedRoute> <Expenses/> </ProtectedRoute>}/>
        <Route path="savings" element={<ProtectedRoute> <Savings/> </ProtectedRoute>  }/>
        <Route path="incomes" element={<ProtectedRoute> <Incomes/>  </ProtectedRoute>  }/>
        <Route path="settings" element={<ProtectedRoute> <SettingsC/>  </ProtectedRoute> }/>
      </Route>
     


      <Route path="*" element={<Login/>}/>
    </Routes>
    </BrowserRouter>

      </AuthContextProvider>
      </SettingsProvider> 
    </QueryClientProvider>
  </StrictMode>,
)
