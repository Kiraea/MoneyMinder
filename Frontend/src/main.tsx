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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>


      <Route path="home" element={<MainHome/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="expenses" element={<Expenses/>}/>
        <Route path="savings" element={<Savings/>}/>
        <Route path="incomes" element={<Incomes/>}/>
        <Route path="settings" element={<SettingsC/>}/>
      </Route>


      <Route path="*" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
