import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './LoginPage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter username and password.')
      return
    }

    localStorage.setItem('nf_username', username)
    setError('')
    navigate('/home')
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="animated-orb orb-one" />
        <div className="animated-orb orb-two" />
        <div className="animated-orb orb-three" />
      </div>

      <header className="login-header">
        <div className="nf-logo">NETFLIX</div>
      </header>

      <motion.main
        className="login-main"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.section
          className="login-card"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <h1 className="login-title">Sign In</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">
              Username
              <input
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </label>
            <label className="login-label">
              Password
              <input
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>
            {error && <div className="login-error">{error}</div>}
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(229, 9, 20, 0.8)' }}
              whileTap={{ scale: 0.97 }}
            >
              Login
            </motion.button>
          </form>
          <p className="login-note">This is a demo Netflix-style project for learning.</p>
        </motion.section>
      </motion.main>
    </div>
  )
}

export default LoginPage

