import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-pixel text-8xl text-primary animate-glitch">404</span>
          </div>
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-4xl font-heading mb-4 text-primary"
      >
        GAME OVER
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl max-w-md mx-auto mb-8"
      >
        The level you're looking for doesn't exist or has been moved to another castle.
      </motion.p>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link to="/" className="arcade-btn-primary flex items-center">
          <Home size={18} className="mr-2" />
          RETURN TO LOBBY
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 font-pixel text-surface-500 text-sm"
      >
        INSERT COIN TO CONTINUE...
      </motion.div>
    </div>
  )
}

export default NotFound