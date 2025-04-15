import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Trophy, Users, Clock, RotateCcw, Play, Pause, Volume2, VolumeX } from 'lucide-react'

// Simple Tetris-like game implementation
const MainFeature = () => {
  const [gameState, setGameState] = useState('idle') // idle, playing, paused, gameOver
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(1)
  const [muted, setMuted] = useState(false)
  const [currentGame, setCurrentGame] = useState('tetris')
  const [gameTime, setGameTime] = useState(0)
  const [gameGrid, setGameGrid] = useState(Array(20).fill().map(() => Array(10).fill(0)))
  const [activePiece, setActivePiece] = useState(null)
  
  // Game pieces with their shapes and colors
  const pieces = [
    { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },             // I piece
    { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },         // O piece
    { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },   // T piece
    { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },      // Z piece
    { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },    // S piece
    { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },     // J piece
    { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' }    // L piece
  ]
  
  // Generate a random piece
  const getRandomPiece = () => {
    const randomIndex = Math.floor(Math.random() * pieces.length)
    const piece = pieces[randomIndex]
    
    return {
      shape: piece.shape,
      color: piece.color,
      x: Math.floor((10 - piece.shape[0].length) / 2),
      y: 0
    }
  }
  
  // Start the game
  const startGame = () => {
    // Reset game state
    setGameState('playing')
    setScore(0)
    setGameTime(0)
    setGameGrid(Array(20).fill().map(() => Array(10).fill(0)))
    setActivePiece(getRandomPiece())
    
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('tetrisHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
  }
  
  // Reset the game
  const resetGame = () => {
    setGameState('idle')
    setScore(0)
    setGameTime(0)
    setGameGrid(Array(20).fill().map(() => Array(10).fill(0)))
    setActivePiece(null)
  }
  
  // Toggle pause state
  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused')
    } else if (gameState === 'paused') {
      setGameState('playing')
    }
  }
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return
      
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0)
          break
        case 'ArrowRight':
          movePiece(1, 0)
          break
        case 'ArrowDown':
          movePiece(0, 1)
          break
        case 'ArrowUp':
          rotatePiece()
          break
        case ' ':
          // Hard drop (implement if needed)
          break
        default:
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, activePiece, gameGrid])
  
  // Game timer
  useEffect(() => {
    let interval
    
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1)
        
        // Auto drop piece based on game speed
        if (gameTime % (11 - gameSpeed) === 0) {
          movePiece(0, 1)
        }
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [gameState, gameTime, gameSpeed])
  
  // Check if the piece can move to the new position
  const canMoveTo = (shape, newX, newY) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const nextX = newX + x
          const nextY = newY + y
          
          // Check boundaries
          if (nextX < 0 || nextX >= 10 || nextY >= 20) {
            return false
          }
          
          // Check if the cell is already occupied
          if (nextY >= 0 && gameGrid[nextY][nextX] !== 0) {
            return false
          }
        }
      }
    }
    
    return true
  }
  
  // Move the active piece
  const movePiece = (deltaX, deltaY) => {
    if (!activePiece || gameState !== 'playing') return
    
    const newX = activePiece.x + deltaX
    const newY = activePiece.y + deltaY
    
    if (canMoveTo(activePiece.shape, newX, newY)) {
      setActivePiece({
        ...activePiece,
        x: newX,
        y: newY
      })
    } else if (deltaY > 0) {
      // If can't move down, lock the piece
      lockPiece()
    }
  }
  
  // Rotate the active piece
  const rotatePiece = () => {
    if (!activePiece || gameState !== 'playing') return
    
    // Transpose and reverse to rotate 90 degrees clockwise
    const rotatedShape = activePiece.shape[0].map((_, colIndex) => 
      activePiece.shape.map(row => row[colIndex]).reverse()
    )
    
    if (canMoveTo(rotatedShape, activePiece.x, activePiece.y)) {
      setActivePiece({
        ...activePiece,
        shape: rotatedShape
      })
    }
  }
  
  // Lock the piece in place and generate a new one
  const lockPiece = () => {
    if (!activePiece) return
    
    // Create a new grid with the locked piece
    const newGrid = [...gameGrid]
    
    for (let y = 0; y < activePiece.shape.length; y++) {
      for (let x = 0; x < activePiece.shape[y].length; x++) {
        if (activePiece.shape[y][x] !== 0) {
          const gridY = activePiece.y + y
          const gridX = activePiece.x + x
          
          // If piece locks above the grid, game over
          if (gridY < 0) {
            endGame()
            return
          }
          
          newGrid[gridY][gridX] = activePiece.color
        }
      }
    }
    
    // Check for completed rows
    const completedRows = []
    for (let y = 0; y < 20; y++) {
      if (newGrid[y].every(cell => cell !== 0)) {
        completedRows.push(y)
      }
    }
    
    // Remove completed rows and add new empty rows at the top
    if (completedRows.length > 0) {
      // Update score based on number of rows cleared
      const pointsPerRow = [40, 100, 300, 1200] // Points for 1, 2, 3, or 4 rows
      const pointsEarned = pointsPerRow[Math.min(completedRows.length - 1, 3)] * gameSpeed
      setScore(prev => prev + pointsEarned)
      
      // Remove completed rows
      completedRows.forEach(rowIndex => {
        newGrid.splice(rowIndex, 1)
        newGrid.unshift(Array(10).fill(0))
      })
      
      // Increase game speed after every 10 rows cleared
      if (score > gameSpeed * 1000 && gameSpeed < 10) {
        setGameSpeed(prev => Math.min(prev + 1, 10))
      }
    }
    
    setGameGrid(newGrid)
    
    // Generate a new piece
    setActivePiece(getRandomPiece())
  }
  
  // End the game
  const endGame = () => {
    setGameState('gameOver')
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('tetrisHighScore', score.toString())
    }
  }
  
  // Render the game grid with the active piece
  const renderGrid = () => {
    // Create a copy of the game grid
    const displayGrid = gameGrid.map(row => [...row])
    
    // Add the active piece to the display grid
    if (activePiece) {
      for (let y = 0; y < activePiece.shape.length; y++) {
        for (let x = 0; x < activePiece.shape[y].length; x++) {
          if (activePiece.shape[y][x] !== 0) {
            const gridY = activePiece.y + y
            const gridX = activePiece.x + x
            
            // Only draw if within grid bounds
            if (gridY >= 0 && gridY < 20 && gridX >= 0 && gridX < 10) {
              displayGrid[gridY][gridX] = activePiece.color
            }
          }
        }
      }
    }
    
    return (
      <div className="grid grid-cols-10 gap-[2px] w-full max-w-[300px] mx-auto bg-surface-800 p-1 border-2 border-primary/50">
        {displayGrid.flat().map((cell, index) => (
          <div 
            key={index} 
            className={`aspect-square ${cell || 'bg-surface-700'} ${cell ? 'shadow-inner' : ''}`}
          />
        ))}
      </div>
    )
  }
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <section className="relative overflow-hidden rounded-2xl bg-surface-800 border border-primary/30">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Game Display */}
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-2xl font-heading text-primary mb-4 text-center">Featured Game: Tetris</h2>
            
            <div className="relative w-full max-w-[300px] mx-auto mb-4">
              {/* CRT Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent mix-blend-overlay"></div>
              <div className="absolute inset-0 pointer-events-none animate-scanline bg-white/[0.02] h-[10px]"></div>
              
              {/* Game Screen */}
              <div className="relative bg-black rounded-md overflow-hidden border-2 border-surface-600">
                <AnimatePresence mode="wait">
                  {gameState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-surface-900 text-center"
                    >
                      <h3 className="text-xl font-pixel text-primary mb-4">TETRIS</h3>
                      <p className="text-surface-300 mb-6">Arrange falling blocks to create complete rows</p>
                      <button 
                        onClick={startGame}
                        className="arcade-btn-primary text-sm px-4 py-2"
                      >
                        START GAME
                      </button>
                    </motion.div>
                  )}
                  
                  {gameState === 'gameOver' && (
                    <motion.div
                      key="gameOver"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-surface-900/90 text-center"
                    >
                      <h3 className="text-xl font-pixel text-primary mb-2">GAME OVER</h3>
                      <p className="text-lg mb-1">Score: {score}</p>
                      <p className="text-sm text-surface-300 mb-4">High Score: {highScore}</p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={startGame}
                          className="arcade-btn-primary text-sm px-3 py-1"
                        >
                          PLAY AGAIN
                        </button>
                        <button 
                          onClick={resetGame}
                          className="arcade-btn-secondary text-sm px-3 py-1"
                        >
                          MAIN MENU
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {gameState === 'paused' && (
                    <motion.div
                      key="paused"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-surface-900/90 text-center"
                    >
                      <h3 className="text-xl font-pixel text-primary mb-4">PAUSED</h3>
                      <button 
                        onClick={togglePause}
                        className="arcade-btn-primary text-sm px-4 py-2 mb-2"
                      >
                        RESUME
                      </button>
                      <button 
                        onClick={resetGame}
                        className="text-surface-300 hover:text-surface-100 text-sm"
                      >
                        Quit Game
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Game Grid */}
                <div className={`${(gameState === 'idle' || gameState === 'paused' || gameState === 'gameOver') ? 'opacity-30' : 'opacity-100'} transition-opacity`}>
                  {renderGrid()}
                </div>
              </div>
            </div>
            
            {/* Game Controls */}
            {(gameState === 'playing' || gameState === 'paused') && (
              <div className="flex justify-center space-x-4 mb-4">
                <button 
                  onClick={togglePause}
                  className="p-2 rounded-full bg-surface-700 hover:bg-surface-600 transition-colors"
                  aria-label={gameState === 'paused' ? 'Resume game' : 'Pause game'}
                >
                  {gameState === 'paused' ? <Play size={20} /> : <Pause size={20} />}
                </button>
                <button 
                  onClick={resetGame}
                  className="p-2 rounded-full bg-surface-700 hover:bg-surface-600 transition-colors"
                  aria-label="Reset game"
                >
                  <RotateCcw size={20} />
                </button>
                <button 
                  onClick={() => setMuted(!muted)}
                  className="p-2 rounded-full bg-surface-700 hover:bg-surface-600 transition-colors"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            )}
            
            {/* Mobile Controls (simplified) */}
            {gameState === 'playing' && (
              <div className="grid grid-cols-3 gap-2 w-full max-w-[300px] mt-4 md:hidden">
                <button 
                  onClick={() => movePiece(-1, 0)}
                  className="p-3 bg-surface-700 rounded-md active:bg-surface-600"
                >
                  ←
                </button>
                <button 
                  onClick={() => movePiece(0, 1)}
                  className="p-3 bg-surface-700 rounded-md active:bg-surface-600"
                >
                  ↓
                </button>
                <button 
                  onClick={() => movePiece(1, 0)}
                  className="p-3 bg-surface-700 rounded-md active:bg-surface-600"
                >
                  →
                </button>
                <button 
                  onClick={rotatePiece}
                  className="p-3 bg-surface-700 rounded-md active:bg-surface-600 col-span-3"
                >
                  Rotate
                </button>
              </div>
            )}
          </div>
          
          {/* Game Info */}
          <div className="flex-1">
            <div className="bg-surface-700/50 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-heading text-secondary mb-4">Game Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-800 rounded-md p-3">
                  <div className="text-surface-400 text-sm mb-1 flex items-center">
                    <Trophy size={14} className="mr-1" />
                    Score
                  </div>
                  <div className="text-2xl font-pixel">{score}</div>
                </div>
                
                <div className="bg-surface-800 rounded-md p-3">
                  <div className="text-surface-400 text-sm mb-1 flex items-center">
                    <Trophy size={14} className="mr-1 text-yellow-400" />
                    High Score
                  </div>
                  <div className="text-2xl font-pixel">{highScore}</div>
                </div>
                
                <div className="bg-surface-800 rounded-md p-3">
                  <div className="text-surface-400 text-sm mb-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Time
                  </div>
                  <div className="text-2xl font-pixel">{formatTime(gameTime)}</div>
                </div>
                
                <div className="bg-surface-800 rounded-md p-3">
                  <div className="text-surface-400 text-sm mb-1 flex items-center">
                    <Gamepad2 size={14} className="mr-1" />
                    Level
                  </div>
                  <div className="text-2xl font-pixel">{gameSpeed}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-700/50 rounded-lg p-4">
              <h3 className="text-xl font-heading text-secondary mb-4">How to Play</h3>
              
              <div className="space-y-3 text-surface-200">
                <p className="flex items-start">
                  <span className="inline-block bg-surface-600 text-center px-2 py-1 rounded mr-2 min-w-[80px] text-sm">Arrow Keys</span>
                  <span>Move and rotate the falling blocks</span>
                </p>
                <p className="flex items-start">
                  <span className="inline-block bg-surface-600 text-center px-2 py-1 rounded mr-2 min-w-[80px] text-sm">↑</span>
                  <span>Rotate piece clockwise</span>
                </p>
                <p className="flex items-start">
                  <span className="inline-block bg-surface-600 text-center px-2 py-1 rounded mr-2 min-w-[80px] text-sm">← →</span>
                  <span>Move piece left or right</span>
                </p>
                <p className="flex items-start">
                  <span className="inline-block bg-surface-600 text-center px-2 py-1 rounded mr-2 min-w-[80px] text-sm">↓</span>
                  <span>Move piece down faster</span>
                </p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-heading text-lg mb-2">Objective</h4>
                <p className="text-surface-300">Arrange the falling blocks to create complete horizontal lines. When a line is completed, it will disappear and you'll earn points. The game ends when the blocks reach the top of the screen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature