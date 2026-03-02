import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="nf-footer">
      <motion.div
        className="nf-footer-text"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
      >
        <span>Developed by </span>
        <motion.span
          className="nf-footer-name"
          animate={{ textShadow: ['0 0 8px #e50914', '0 0 22px #e50914', '0 0 8px #e50914'] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          Deepali Avasthi
        </motion.span>
      </motion.div>
      <motion.div
        className="nf-footer-glow"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
      />
    </footer>
  )
}

export default Footer

