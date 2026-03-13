import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Characters = lazy(() => import('../pages/Characters'))
const CharacterDetail = lazy(() => import('../pages/CharacterDetail'))

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <p className="text-green-400 text-lg">Carregando...</p>
        </div>
      }>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/characters" element={
            <PrivateRoute>
              <Characters />
            </PrivateRoute>
          } />
          <Route path="/characters/:id" element={
            <PrivateRoute>
              <CharacterDetail />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}