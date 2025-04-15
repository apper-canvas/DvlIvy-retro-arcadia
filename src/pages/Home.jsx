import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trophy, Star, Clock, ChevronRight, ChevronLeft } from 'lucide-react'
import MainFeature from '../components/MainFeature'
import ArcadeBackgroundSVG from '../components/svg/ArcadeBackgroundSVG'
import PacManSVG from '../components/svg/PacManSVG'
import TetrisSVG from '../components/svg/TetrisSVG'
import SpaceInvadersSVG from '../components/svg/SpaceInvadersSVG'
import DonkeyKongSVG from '../components/svg/DonkeyKongSVG'
import GalagaSVG from '../components/svg/GalagaSVG'
import FroggerSVG from '../components/svg/FroggerSVG'

const FEATURED_GAMES = [
  {
    id: 'pacman',
    title: 'Pac-Man',
    year: 1980,
    category: 'Maze',
    description: 'Navigate through a maze while eating dots and avoiding ghosts.',
    svgComponent: PacManSVG,
    difficulty: 'Medium',
    highScore: 999999
  },
  {
    id: 'tetris',
    title: 'Tetris',
    year: 1984,
    category: 'Puzzle',
    description: 'Manipulate falling blocks to create complete rows without gaps.',
    svgComponent: TetrisSVG,
    difficulty: 'Easy',
    highScore: 500000
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    year: 1978,
    category: 'Shooter',
    description: 'Defend Earth from waves of descending alien invaders.',
    svgComponent: SpaceInvadersSVG,
    difficulty: 'Hard',
    highScore: 750000
  },
  {
    id: 'donkey-kong',
    title: 'Donkey Kong',
    year: 1981,
    category: 'Platform',
    description: 'Rescue the princess by climbing ladders and avoiding barrels.',
    svgComponent: DonkeyKongSVG,
    difficulty: 'Hard',
    highScore: 850000
  },
  {
    id: 'galaga',
    title: 'Galaga',
    year: 1981,
    category: 'Shooter',
    description: 'Destroy insect-like aliens while avoiding their attacks.',
    svgComponent: GalagaSVG,
    difficulty: 'Medium',
    highScore: 700000
  },
  {
    id: 'frogger',
    title: 'Frogger',
    year: 1981,
    category: 'Action',
    description: 'Guide frogs across a busy road and hazardous river.',
    svgComponent: FroggerSVG,
    difficulty: 'Medium',
    highScore: 600000
  }
]

const CATEGORIES = [
  'All Games',
  'Action',
  'Puzzle',
  'Shooter',
  'Platform',
  'Maze',
  'Racing'
]

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Games')
  const [filteredGames, setFilteredGames] = useState(FEATURED_GAMES)
  const [selectedGame, setSelectedGame] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Filter games based on search query and category
  useEffect(() => {
    let result = FEATURED_GAMES
    
    if (searchQuery) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedCategory !== 'All Games') {
      result = result.filter(game => game.category === selectedCategory)
    }
    
    setFilteredGames(result)
  }, [searchQuery, selectedCategory])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.min(2, Math.ceil(filteredGames.length / 3) - 1) ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.min(2, Math.ceil(filteredGames.length / 3) - 1) : prev - 1))
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-800 to-surface-900 border border-primary/30">
        <div className="absolute inset-0 bg-opacity-20">
          <ArcadeBackgroundSVG className="w-full h-full opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/70 to-transparent"></div>
        
        <div className="relative z-10 px-6 py-12 md:py-20 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-heading mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            CLASSIC ARCADE GAMES
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-sans mb-8 max-w-2xl mx-auto"
          >
            Relive the golden age of gaming with authentic arcade classics
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="arcade-btn-primary mr-4">
              PLAY NOW
            </button>
            <button className="arcade-btn-secondary">
              LEADERBOARDS
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Main Feature */}
      <MainFeature />
      
      {/* Game Browser */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-heading text-primary">Browse Games</h2>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-surface-800 border border-primary/30 rounded-md focus:outline-none focus:border-primary/60 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
            </div>
            
            {/* Category Filter */}
            <div className="scrollbar-hide overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-surface-800 border border-primary/30 hover:border-primary/60'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Game Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredGames.slice(currentSlide * 3, currentSlide * 3 + 3).map(game => {
                const GameSvgComponent = game.svgComponent;
                return (
                  <motion.div
                    key={game.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="arcade-card group cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                      <GameSvgComponent 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-sm bg-primary/80 backdrop-blur-sm px-2 py-1 rounded">
                            {game.category}
                          </span>
                          <span className="flex items-center text-sm bg-surface-800/80 backdrop-blur-sm px-2 py-1 rounded">
                            <Trophy size={14} className="mr-1 text-yellow-400" />
                            {game.highScore.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-heading mb-2 text-primary group-hover:text-glow">{game.title}</h3>
                    
                    <div className="flex justify-between items-center mb-3 text-sm text-surface-300">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {game.year}
                      </span>
                      <span className="flex items-center">
                        <Star size={14} className="mr-1 text-yellow-400" />
                        {game.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-surface-400 text-sm line-clamp-2">{game.description}</p>
                    
                    <div className="mt-4 text-right">
                      <button className="text-primary hover:text-primary-light font-heading text-sm flex items-center ml-auto">
                        PLAY NOW
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          {filteredGames.length > 3 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-surface-800/80 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-colors"
                aria-label="Previous games"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-surface-800/80 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-colors"
                aria-label="Next games"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-12 bg-surface-800/50 rounded-lg border border-primary/20">
            <p className="text-xl">No games found matching your search.</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Games')
              }}
              className="mt-4 text-primary hover:text-primary-light"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      
      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/80 backdrop-blur-sm"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-surface-800 border border-primary/40 rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                {selectedGame.svgComponent && (
                  <selectedGame.svgComponent 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent"></div>
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-surface-800/80 backdrop-blur-sm"
                  onClick={() => setSelectedGame(null)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <h2 className="text-3xl font-heading text-primary mb-2 md:mb-0">{selectedGame.title}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 rounded bg-primary/20 text-primary">{selectedGame.category}</span>
                    <span className="flex items-center">
                      <Trophy size={16} className="mr-1 text-yellow-400" />
                      {selectedGame.highScore.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-heading mb-2 text-surface-300">Release Year</h3>
                    <p className="text-xl">{selectedGame.year}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading mb-2 text-surface-300">Difficulty</h3>
                    <p className="text-xl flex items-center">
                      <Star size={18} className="mr-2 text-yellow-400" />
                      {selectedGame.difficulty}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading mb-2 text-surface-300">Controls</h3>
                    <p className="text-xl">Arrow Keys + Space</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-heading mb-2 text-surface-300">Description</h3>
                  <p className="text-lg">{selectedGame.description}</p>
                </div>
                
                <div className="flex justify-end">
                  <button className="arcade-btn-primary">
                    PLAY NOW
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home