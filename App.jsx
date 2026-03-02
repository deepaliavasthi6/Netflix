import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import LoginPage from './LoginPage.jsx'
import HomePage from './HomePage.jsx'
import Footer from './Footer.jsx'

const isAuthenticated = () => {
  return Boolean(localStorage.getItem('nf_username'))
}

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

const PageWrapper = ({ children }) => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="page-wrapper"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="app-root">
      <PageWrapper>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </div>
  )
}

export default App
