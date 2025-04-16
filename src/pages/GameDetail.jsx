import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Star, Clock, ArrowLeft, Play } from 'lucide-react'
import PacManSVG from '../components/svg/PacManSVG'
import TetrisSVG from '../components/svg/TetrisSVG'
import SpaceInvadersSVG from '../components/svg/SpaceInvadersSVG'
import DonkeyKongSVG from '../components/svg/DonkeyKongSVG'
import GalagaSVG from '../components/svg/GalagaSVG'
import FroggerSVG from '../components/svg/FroggerSVG'

// Game data to be used for the detail pages
const GAMES_DATA = [
  {
    id: 'pacman',
    title: 'Pac-Man',
    year: 1980,
    category: 'Maze',
    description: 'Navigate through a maze while eating dots and avoiding ghosts. Pac-Man is one of the most iconic arcade games of all time, known for its simple yet addictive gameplay. Players must eat all the dots in a maze while avoiding four ghosts: Blinky, Pinky, Inky, and Clyde. Special power pellets allow Pac-Man to temporarily eat the ghosts for bonus points.',
    longDescription: 'Pac-Man revolutionized the arcade scene when it was released by Namco in 1980. The game\'s creator, Toru Iwatani, wanted to create a game that would appeal to everyone, including women, which was revolutionary for the time. The game\'s simple yet challenging mechanics made it an instant hit worldwide. The distinctive "wakka wakka" sound as Pac-Man eats dots has become one of the most recognizable audio cues in gaming history. The game has spawned numerous sequels, spin-offs, and has been ported to virtually every gaming platform.',
    controls: 'Use arrow keys to move Pac-Man through the maze. Avoid ghosts unless you\'ve eaten a power pellet, which temporarily allows you to eat them for bonus points.',
    svgComponent: PacManSVG,
    difficulty: 'Medium',
    highScore: 999999,
    averagePlayTime: '5-10 minutes'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    year: 1984,
    category: 'Puzzle',
    description: 'Manipulate falling blocks to create complete rows without gaps.',
    longDescription: 'Tetris was created by Russian software engineer Alexey Pajitnov in 1984. The game draws heavy inspiration from his favorite puzzle board game, Pentominos. The name "Tetris" combines the Greek word "tetra" (meaning "four") and Pajitnov\'s favorite sport, tennis. The game gained international attention when it was bundled with Nintendo\'s Game Boy in 1989. Tetris remains one of the most ported video games of all time and continues to be a cultural phenomenon that transcends generations. The simplicity of the game\'s design contrasts with its deep strategic gameplay, making it both easy to learn and difficult to master.',
    controls: 'Use arrow keys to move and rotate the falling tetromino pieces. Down arrow accelerates descent, spacebar instantly drops the piece.',
    svgComponent: TetrisSVG,
    difficulty: 'Easy',
    highScore: 500000,
    averagePlayTime: '10-15 minutes'
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    year: 1978,
    category: 'Shooter',
    description: 'Defend Earth from waves of descending alien invaders.',
    longDescription: 'Space Invaders was designed by Tomohiro Nishikado and released in 1978 by Taito. It was one of the earliest shooting games and helped expand the video game industry from a novelty to a global industry. The game was originally manufactured by Taito in Japan, but after seeing its success, Midway acquired the licensing rights to distribute it in the United States. When Space Invaders was released, it was so popular in Japan that it caused a shortage of 100-yen coins. The game\'s success lies in its simple yet addictive gameplay, with waves of aliens slowly descending toward the player who must shoot them before they reach the bottom of the screen.',
    controls: 'Use left and right arrow keys to move your cannon. Spacebar to fire at the descending aliens. Use the barriers as protection, but be aware they can be destroyed by both alien and player fire.',
    svgComponent: SpaceInvadersSVG,
    difficulty: 'Hard',
    highScore: 750000,
    averagePlayTime: '15-20 minutes'
  },
  {
    id: 'donkey-kong',
    title: 'Donkey Kong',
    year: 1981,
    category: 'Platform',
    description: 'Rescue the princess by climbing ladders and avoiding barrels.',
    longDescription: 'Donkey Kong was created by Shigeru Miyamoto and released by Nintendo in 1981. It is considered to be the first example of the platform game genre as the gameplay focused on maneuvering the main character across platforms and jumping over obstacles. The game also introduced two of Nintendo\'s most popular characters - Donkey Kong (the giant ape) and the hero (later named "Jumpman," who would eventually become Mario). The game was groundbreaking for its time as it used graphics and animation as tools for characterization and featured multiple stage layouts that told a complete story of "Jumpman" trying to rescue Lady (later named Pauline) from the giant ape Donkey Kong.',
    controls: 'Use left and right arrow keys to move "Jumpman" (Mario). Press spacebar to jump over barrels and other obstacles. Climb ladders by moving up and down when positioned on them.',
    svgComponent: DonkeyKongSVG,
    difficulty: 'Hard',
    highScore: 850000,
    averagePlayTime: '15-20 minutes'
  },
  {
    id: 'galaga',
    title: 'Galaga',
    year: 1981,
    category: 'Shooter',
    description: 'Destroy insect-like aliens while avoiding their attacks.',
    longDescription: 'Galaga was developed and published by Namco in 1981 as the sequel to Galaxian. The game expanded on its predecessor with more complex gameplay and improved graphics. One of the most distinctive features of Galaga is the "Challenging Stage" where waves of enemies fly in formation without attacking, allowing skilled players to earn bonus points. Another unique gameplay element is the alien tractor beam that can capture the player\'s ship. If the player destroys the capturing enemy while having another ship in reserve, they can merge with their captured fighter for double firepower. Galaga has maintained its popularity over decades and is often cited as one of the greatest arcade games of the golden age.',
    controls: 'Use left and right arrow keys to move your ship horizontally at the bottom of the screen. Press spacebar to fire at the attacking aliens. Try to avoid getting captured by the tractor beam, or use it strategically to get a dual-ship with double firepower.',
    svgComponent: GalagaSVG,
    difficulty: 'Medium',
    highScore: 700000,
    averagePlayTime: '10-15 minutes'
  },
  {
    id: 'frogger',
    title: 'Frogger',
    year: 1981,
    category: 'Action',
    description: 'Guide frogs across a busy road and hazardous river.',
    longDescription: 'Frogger was developed by Konami and published by Sega in 1981. The game was unique among arcade games of its time for its gameplay focused on avoiding hazards rather than defeating enemies. The objective of Frogger is to direct a frog from the bottom of the screen to one of the safe homes at the top. To do this, the player must guide the frog across a busy road full of vehicles and then across a river full of hazards including alligators, turtles that submerge, and otters. The game\'s concept was inspired by people trying to cross busy streets in Japan. Frogger\'s simple but challenging gameplay made it instantly accessible and has resulted in it becoming one of the most well-known arcade games from the early 1980s.',
    controls: 'Use arrow keys to move the frog one hop at a time in any of the four directions. Time your movements carefully to avoid traffic on the road and use logs and turtles to cross the river. Be careful as some turtles will submerge after a while!',
    svgComponent: FroggerSVG,
    difficulty: 'Medium',
    highScore: 600000,
    averagePlayTime: '5-10 minutes'
  }
]

const GameDetail = () => {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Find the game data based on the gameId parameter
    const foundGame = GAMES_DATA.find(g => g.id === gameId)
    
    if (foundGame) {
      setGame(foundGame)
      setLoading(false)
    } else {
      setError(`Game with ID "${gameId}" not found`)
      setLoading(false)
    }
  }, [gameId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-primary text-xl">Loading game data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
        <h2 className="text-xl font-heading text-red-400 mb-4">Error</h2>
        <p className="text-surface-300">{error}</p>
        <Link to="/" className="mt-6 inline-block text-primary hover:text-primary-light">
          Return to game library
        </Link>
      </div>
    )
  }

  if (!game) return null

  const GameSvgComponent = game.svgComponent

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-light transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Game Library
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
        <GameSvgComponent className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 rounded bg-primary/20 text-primary text-sm mb-3">
            {game.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-2">{game.title}</h1>
          <div className="flex items-center space-x-4 text-surface-300">
            <span className="flex items-center">
              <Clock size={16} className="mr-1" />
              {game.year}
            </span>
            <span className="flex items-center">
              <Star size={16} className="mr-1 text-yellow-400" />
              {game.difficulty}
            </span>
            <span className="flex items-center">
              <Trophy size={16} className="mr-1 text-yellow-400" />
              {game.highScore.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Game Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-heading text-primary mb-4">Description</h2>
            <p className="text-lg mb-4">{game.description}</p>
            <p className="text-surface-300">{game.longDescription}</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-primary mb-4">How to Play</h2>
            <div className="bg-surface-800/50 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-heading mb-2 text-surface-200">Controls</h3>
              <p className="text-surface-300">{game.controls}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Play Button */}
          <div className="bg-surface-800/50 rounded-lg p-6 border border-primary/20 text-center">
            <button className="arcade-btn-primary w-full flex items-center justify-center">
              <Play size={20} className="mr-2" />
              PLAY NOW
            </button>
          </div>

          {/* Game Details */}
          <div className="bg-surface-800/50 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-heading mb-4 text-surface-200">Game Details</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-surface-400">Release Year</h4>
                <p className="text-lg">{game.year}</p>
              </div>
              
              <div>
                <h4 className="text-sm text-surface-400">Category</h4>
                <p className="text-lg">{game.category}</p>
              </div>
              
              <div>
                <h4 className="text-sm text-surface-400">Difficulty</h4>
                <p className="text-lg flex items-center">
                  <Star size={16} className="mr-2 text-yellow-400" />
                  {game.difficulty}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm text-surface-400">High Score</h4>
                <p className="text-lg flex items-center">
                  <Trophy size={16} className="mr-2 text-yellow-400" />
                  {game.highScore.toLocaleString()}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm text-surface-400">Average Play Time</h4>
                <p className="text-lg">{game.averagePlayTime}</p>
              </div>
            </div>
          </div>
          
          {/* Leaderboard Preview */}
          <div className="bg-surface-800/50 rounded-lg p-6 border border-primary/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-heading text-surface-200">Top Players</h3>
              <Link to="/leaderboards" className="text-primary text-sm hover:text-primary-light">View All</Link>
            </div>
            
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 rounded bg-surface-900/50">
                <div className="flex items-center">
                  <span className="text-primary mr-3">1</span>
                  <span>Player1</span>
                </div>
                <span>{Math.floor(game.highScore * 0.95).toLocaleString()}</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded bg-surface-900/50">
                <div className="flex items-center">
                  <span className="text-primary mr-3">2</span>
                  <span>Player2</span>
                </div>
                <span>{Math.floor(game.highScore * 0.9).toLocaleString()}</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded bg-surface-900/50">
                <div className="flex items-center">
                  <span className="text-primary mr-3">3</span>
                  <span>Player3</span>
                </div>
                <span>{Math.floor(game.highScore * 0.85).toLocaleString()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Games */}
      <section className="mt-12">
        <h2 className="text-2xl font-heading text-primary mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {GAMES_DATA.filter(g => g.id !== game.id && g.category === game.category)
            .slice(0, 2)
            .concat(GAMES_DATA.filter(g => g.id !== game.id && g.category !== game.category).slice(0, 2))
            .map(relatedGame => {
              const RelatedGameSvg = relatedGame.svgComponent;
              return (
                <Link 
                  key={relatedGame.id}
                  to={`/game/${relatedGame.id}`}
                  className="arcade-card group cursor-pointer"
                >
                  <div className="relative h-36 mb-3 overflow-hidden rounded-md">
                    <RelatedGameSvg className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent"></div>
                  </div>
                  <h3 className="text-lg font-heading text-primary group-hover:text-glow">{relatedGame.title}</h3>
                  <p className="text-surface-400 text-sm line-clamp-1">{relatedGame.category}</p>
                </Link>
              );
            })}
        </div>
      </section>
    </motion.div>
  )
}

export default GameDetail