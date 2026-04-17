import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Contacts from './pages/Contacts'
import ContactForm from './components/ContactForm'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts/new"
            element={
              <ProtectedRoute>
                <ContactForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts/edit/:id"
            element={
              <ProtectedRoute>
                <ContactForm />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
