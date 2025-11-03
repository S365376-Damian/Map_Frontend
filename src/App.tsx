import React, { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Navbar from './components/common/Navbar'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Map from './pages/Map'
import Reports from './pages/Reports'
import Admin from './pages/Admin'

import { useAuthStore } from './stores/auth'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore()
  if (isLoading) return <div>Loading...</div>
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <Navigate to="/login" />
  if (user?.role !== 'admin') return <Navigate to="/" />
  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App



