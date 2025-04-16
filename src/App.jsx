import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
import NotFound from './pages/NotFound'
import ScanlineSVG from './components/svg/ScanlineSVG'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : true
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen bg-gradient-to-br ${darkMode ? 'from-surface-900 to-surface-800' : 'from-surface-100 to-surface-200'} transition-colors duration-300`}>
      {/* CRT Overlay Effect */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent to-black opacity-[0.03] z-50"></div>
      <ScanlineSVG className="pointer-events-none fixed inset-0 opacity-[0.03] z-50 animate-scanline" />
      
      {/* Header */}
      <header className="relative border-b border-primary/30 backdrop-blur-sm bg-surface-900/80 dark:bg-surface-900/80 text-surface-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mr-2"
            >
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="font-pixel text-lg text-surface-900">RA</span>
              </div>
            </motion.div>
            <h1 className="font-heading text-xl md:text-2xl tracking-wider bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              RetroArcadia
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6 font-sans text-lg">
                <li><a href="/" className="hover:text-primary transition-colors">Games</a></li>
                <li><a href="/leaderboards" className="hover:text-primary transition-colors">Leaderboards</a></li>
                <li><a href="/profile" className="hover:text-primary transition-colors">Profile</a></li>
              </ul>
            </nav>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-surface-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-blue-300" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
          
          <button 
            className="md:hidden p-2 text-surface-100 hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface-800 border-t border-primary/20"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="space-y-4 font-sans text-lg">
                  <li><a href="/" className="block py-2 hover:text-primary transition-colors">Games</a></li>
                  <li><a href="/leaderboards" className="block py-2 hover:text-primary transition-colors">Leaderboards</a></li>
                  <li><a href="/profile" className="block py-2 hover:text-primary transition-colors">Profile</a></li>
                  <li>
                    <button 
                      onClick={() => setDarkMode(!darkMode)}
                      className="flex items-center py-2 hover:text-primary transition-colors"
                    >
                      {darkMode ? <Sun className="mr-2 text-yellow-300" /> : <Moon className="mr-2 text-blue-300" />}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameId" element={<GameDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="border-t border-primary/30 py-6 mt-12 bg-surface-900/80 backdrop-blur-sm text-surface-400">
        <div className="container mx-auto px-4 text-center">
          <p className="font-sans">© {new Date().getFullYear()} RetroArcadia. All rights reserved.</p>
          <p className="text-sm mt-2">Bringing classic arcade games to your browser since 2023.</p>
        </div>
      </footer>
    </div>
  )
}

export default App