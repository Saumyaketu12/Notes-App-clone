import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { NotesProvider } from './contexts/NotesContext'
import ToastProvider from './components/UI/ToastProvider';

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <ToastProvider />
          <AppRoutes />
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}