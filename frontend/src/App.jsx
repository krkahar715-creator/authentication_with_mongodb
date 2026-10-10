import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/login.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/home.jsx'
import DataContext from './context/DataContext.jsx'

function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white" role="status">
      <p>Checking your session...</p>
    </div>
  )
}

function HomeRoute() {
  const { user, isAuthLoading } = useContext(DataContext)
  if (isAuthLoading) return <AuthLoading />
  return user ? <Home /> : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const { user, isAuthLoading } = useContext(DataContext)
  if (isAuthLoading) return <AuthLoading />
  return user ? <Navigate to="/home" replace /> : children
}

export default function App() {
  const { user, isAuthLoading } = useContext(DataContext)

  return (
    <main className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={isAuthLoading ? <AuthLoading /> : <Navigate to={user ? "/home" : "/login"} replace />}
        />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="/home" element={<HomeRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}
