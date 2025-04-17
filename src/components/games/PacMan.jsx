import { useState, useEffect, useRef, useCallback } from 'react';

// Game constants
const CELL_SIZE = 20;
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;
const GAME_WIDTH = CELL_SIZE * GRID_WIDTH;
const GAME_HEIGHT = CELL_SIZE * GRID_HEIGHT;

// Entity types
const EMPTY = 0;
const WALL = 1;
const DOT = 2;
const POWER_PELLET = 3;
const GHOST_LAIR = 4;

// Game speeds
const PAC_SPEED = 2;
const GHOST_SPEED = 1.75;
const GHOST_FRIGHTENED_SPEED = 1;

// Directions
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const STOP = { x: 0, y: 0 };

// Ghost states
const SCATTER = 'scatter';
const CHASE = 'chase';
const FRIGHTENED = 'frightened';

// Game states
const READY = 'ready';
const PLAYING = 'playing';
const PAUSED = 'paused';
const GAME_OVER = 'gameOver';
const WIN = 'win';

// Colors
const COLORS = {
  wall: '#2563eb',
  dot: '#f59e0b',
  powerPellet: '#f59e0b',
  pacman: '#FFCC00',
  blinky: '#f87171',
  pinky: '#ec4899',
  inky: '#60a5fa',
  clyde: '#fb923c',
  frightened: '#4b5563',
  frightenenedEnd: '#6b7280',
  text: '#e2e8f0',
  score: '#f59e0b',
  life: '#FFCC00'
};

// Initial maze layout
const mazeLayout = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Ghost starting positions and targets
const ghostStartPositions = {
  blinky: { x: 14, y: 11, direction: LEFT }, 
  pinky: { x: 14, y: 14, direction: UP },
  inky: { x: 12, y: 14, direction: UP },
  clyde: { x: 16, y: 14, direction: UP }
};

// Create a copy of the maze layout
const createMazeGrid = () => {
  return mazeLayout.map(row => [...row]);
};

const PacMan = ({ onGameOver, onScore }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState(READY);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [dots, setDots] = useState(0);
  const [frightTime, setFrightTime] = useState(0);
  const [grid, setGrid] = useState(createMazeGrid());
  
  // Game entities
  const [pacman, setPacman] = useState({
    x: 14 * CELL_SIZE, 
    y: 23 * CELL_SIZE, 
    direction: STOP,
    nextDirection: STOP,
    angle: 0,
    mouthOpen: 0.2,
    mouthDir: 0.05
  });
  
  const [ghosts, setGhosts] = useState({
    blinky: {
      ...ghostStartPositions.blinky,
      x: ghostStartPositions.blinky.x * CELL_SIZE,
      y: ghostStartPositions.blinky.y * CELL_SIZE,
      state: SCATTER,
      target: { x: GRID_WIDTH - 3, y: 0 }
    },
    pinky: {
      ...ghostStartPositions.pinky,
      x: ghostStartPositions.pinky.x * CELL_SIZE,
      y: ghostStartPositions.pinky.y * CELL_SIZE,
      state: SCATTER,
      target: { x: 3, y: 0 }
    },
    inky: {
      ...ghostStartPositions.inky,
      x: ghostStartPositions.inky.x * CELL_SIZE,
      y: ghostStartPositions.inky.y * CELL_SIZE,
      state: SCATTER,
      target: { x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1 }
    },
    clyde: {
      ...ghostStartPositions.clyde,
      x: ghostStartPositions.clyde.x * CELL_SIZE,
      y: ghostStartPositions.clyde.y * CELL_SIZE,
      state: SCATTER,
      target: { x: 0, y: GRID_HEIGHT - 1 }
    }
  });

  // Count total dots in the maze
  useEffect(() => {
    let totalDots = 0;
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (mazeLayout[y][x] === DOT || mazeLayout[y][x] === POWER_PELLET) {
          totalDots++;
        }
      }
    }
    setDots(totalDots);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== PLAYING) {
        if (e.key === 'Enter' && (gameState === READY || gameState === GAME_OVER || gameState === WIN)) {
          resetGame();
          setGameState(PLAYING);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          setPacman(prev => ({ ...prev, nextDirection: LEFT }));
          break;
        case 'ArrowRight':
          setPacman(prev => ({ ...prev, nextDirection: RIGHT }));
          break;
        case 'ArrowUp':
          setPacman(prev => ({ ...prev, nextDirection: UP }));
          break;
        case 'ArrowDown':
          setPacman(prev => ({ ...prev, nextDirection: DOWN }));
          break;
        case 'p':
        case 'P':
          setGameState(prev => prev === PLAYING ? PAUSED : PLAYING);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Reset game state
  const resetGame = useCallback(() => {
    setGrid(createMazeGrid());
    setPacman({
      x: 14 * CELL_SIZE, 
      y: 23 * CELL_SIZE, 
      direction: STOP,
      nextDirection: STOP,
      angle: 0,
      mouthOpen: 0.2,
      mouthDir: 0.05
    });
    
    setGhosts({
      blinky: {
        ...ghostStartPositions.blinky,
        x: ghostStartPositions.blinky.x * CELL_SIZE,
        y: ghostStartPositions.blinky.y * CELL_SIZE,
        state: SCATTER,
        target: { x: GRID_WIDTH - 3, y: 0 }
      },
      pinky: {
        ...ghostStartPositions.pinky,
        x: ghostStartPositions.pinky.x * CELL_SIZE,
        y: ghostStartPositions.pinky.y * CELL_SIZE,
        state: SCATTER,
        target: { x: 3, y: 0 }
      },
      inky: {
        ...ghostStartPositions.inky,
        x: ghostStartPositions.inky.x * CELL_SIZE,
        y: ghostStartPositions.inky.y * CELL_SIZE,
        state: SCATTER,
        target: { x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1 }
      },
      clyde: {
        ...ghostStartPositions.clyde,
        x: ghostStartPositions.clyde.x * CELL_SIZE,
        y: ghostStartPositions.clyde.y * CELL_SIZE,
        state: SCATTER,
        target: { x: 0, y: GRID_HEIGHT - 1 }
      }
    });
    
    setFrightTime(0);
    
    // Count dots for level completion
    let totalDots = 0;
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (mazeLayout[y][x] === DOT || mazeLayout[y][x] === POWER_PELLET) {
          totalDots++;
        }
      }
    }
    setDots(totalDots);
  }, []);

  // Start new level
  const startNewLevel = useCallback(() => {
    setLevel(prev => prev + 1);
    resetGame();
    setGameState(PLAYING);
  }, [resetGame]);

  // Check if moving in a direction is valid
  const canMove = useCallback((x, y, direction) => {
    const targetX = Math.floor((x + direction.x * CELL_SIZE) / CELL_SIZE);
    const targetY = Math.floor((y + direction.y * CELL_SIZE) / CELL_SIZE);
    
    // Handle wrap-around tunnel
    if (targetX < 0) return targetY === 14;
    if (targetX >= GRID_WIDTH) return targetY === 14;
    
    return targetY >= 0 && targetY < GRID_HEIGHT && 
           (grid[targetY][targetX] !== WALL);
  }, [grid]);

  // Get grid position from pixel coordinates
  const getGridPosition = useCallback((x, y) => {
    return {
      x: Math.floor(x / CELL_SIZE),
      y: Math.floor(y / CELL_SIZE)
    };
  }, []);

  // Check if two entities are colliding
  const checkCollision = useCallback((entity1, entity2, threshold = CELL_SIZE / 2) => {
    const distance = Math.sqrt(
      Math.pow(entity1.x - entity2.x, 2) + 
      Math.pow(entity1.y - entity2.y, 2)
    );
    return distance < threshold;
  }, []);

  // Ghost AI: Get available directions at current position
  const getAvailableDirections = useCallback((ghost) => {
    const gridPos = getGridPosition(ghost.x, ghost.y);
    const availableDirections = [];
    
    // Check all four directions
    if (gridPos.y > 0 && grid[gridPos.y - 1][gridPos.x] !== WALL) {
      availableDirections.push(UP);
    }
    if (gridPos.y < GRID_HEIGHT - 1 && grid[gridPos.y + 1][gridPos.x] !== WALL) {
      availableDirections.push(DOWN);
    }
    if (gridPos.x > 0 && grid[gridPos.y][gridPos.x - 1] !== WALL) {
      availableDirections.push(LEFT);
    }
    if (gridPos.x < GRID_WIDTH - 1 && grid[gridPos.y][gridPos.x + 1] !== WALL) {
      availableDirections.push(RIGHT);
    }
    
    // Filter out the reverse of current direction (ghosts can't turn around)
    return availableDirections.filter(dir => 
      !(dir.x === -ghost.direction.x && dir.y === -ghost.direction.y)
    );
  }, [getGridPosition, grid]);

  // Ghost AI: Get best direction to target
  const getBestDirection = useCallback((ghost, target) => {
    const availableDirections = getAvailableDirections(ghost);
    
    if (availableDirections.length === 0) return ghost.direction;
    if (availableDirections.length === 1) return availableDirections[0];
    
    // If frightened, choose random direction
    if (ghost.state === FRIGHTENED) {
      return availableDirections[Math.floor(Math.random() * availableDirections.length)];
    }
    
    // Otherwise, choose direction that gets closest to target
    const gridPos = getGridPosition(ghost.x, ghost.y);
    let bestDirection = availableDirections[0];
    let bestDistance = Infinity;
    
    availableDirections.forEach(dir => {
      const newX = gridPos.x + dir.x;
      const newY = gridPos.y + dir.y;
      
      // Handle wrap-around for distance calculation
      let dx = newX - target.x;
      let dy = newY - target.y;
      
      const distance = dx * dx + dy * dy;
      
      if (distance < bestDistance) {
        bestDistance = distance;
        bestDirection = dir;
      }
    });
    
    return bestDirection;
  }, [getAvailableDirections, getGridPosition]);

  // Game loop
  useEffect(() => {
    if (gameState !== PLAYING) return;

    const ctx = canvasRef.current.getContext('2d');
    
    let lastTimestamp = 0;
    let animationId;

    const gameLoop = (timestamp) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }
      
      const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
      lastTimestamp = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      // Update frighten timer
      if (frightTime > 0) {
        setFrightTime(prev => Math.max(0, prev - deltaTime));
      }
      
      // Update Pac-Man position
      updatePacman(deltaTime);
      
      // Update ghost positions
      updateGhosts(deltaTime);
      
      // Draw the game
      drawGame(ctx);
      
      // Check win condition
      if (dots === 0) {
        setGameState(WIN);
        if (onScore) onScore(score);
        return;
      }
      
      animationId = requestAnimationFrame(gameLoop);
    };
    
    animationId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [gameState, pacman, ghosts, grid, dots, frightTime, score]);

  // Update Pac-Man position and handle collisions
  const updatePacman = useCallback((deltaTime) => {
    // Try to change direction if a new direction is queued
    if (pacman.nextDirection !== STOP) {
      const gridPos = getGridPosition(pacman.x, pacman.y);
      const centered = 
        pacman.x % CELL_SIZE < PAC_SPEED && 
        pacman.y % CELL_SIZE < PAC_SPEED;
      
      if (centered && canMove(gridPos.x * CELL_SIZE, gridPos.y * CELL_SIZE, pacman.nextDirection)) {
        setPacman(prev => ({
          ...prev,
          direction: prev.nextDirection,
          nextDirection: STOP,
          x: gridPos.x * CELL_SIZE,
          y: gridPos.y * CELL_SIZE
        }));
      }
    }
    
    // Move in current direction
    if (pacman.direction !== STOP && canMove(pacman.x, pacman.y, pacman.direction)) {
      const newX = pacman.x + pacman.direction.x * PAC_SPEED;
      const newY = pacman.y + pacman.direction.y * PAC_SPEED;
      
      // Handle wrap-around
      let wrappedX = newX;
      if (newX < -CELL_SIZE) wrappedX = GAME_WIDTH;
      else if (newX > GAME_WIDTH) wrappedX = -CELL_SIZE;
      
      // Update pacman position
      setPacman(prev => ({
        ...prev,
        x: wrappedX,
        y: newY,
        angle: getAngleFromDirection(prev.direction),
        mouthOpen: prev.mouthOpen + prev.mouthDir,
      }));
      
      // Handle mouth animation
      if (pacman.mouthOpen >= 0.5 || pacman.mouthOpen <= 0) {
        setPacman(prev => ({
          ...prev,
          mouthDir: -prev.mouthDir
        }));
      }
    }
    
    // Check for dot collection
    const gridPos = getGridPosition(pacman.x, pacman.y);
    if (
      gridPos.x >= 0 && gridPos.x < GRID_WIDTH && 
      gridPos.y >= 0 && gridPos.y < GRID_HEIGHT
    ) {
      if (grid[gridPos.y][gridPos.x] === DOT) {
        // Collect dot
        const newGrid = [...grid];
        newGrid[gridPos.y][gridPos.x] = EMPTY;
        setGrid(newGrid);
        setScore(prev => prev + 10);
        setDots(prev => prev - 1);
      }
      else if (grid[gridPos.y][gridPos.x] === POWER_PELLET) {
        // Collect power pellet
        const newGrid = [...grid];
        newGrid[gridPos.y][gridPos.x] = EMPTY;
        setGrid(newGrid);
        setScore(prev => prev + 50);
        setDots(prev => prev - 1);
        setFrightTime(8); // 8 seconds of ghost fright
        
        // Make all ghosts frightened
        setGhosts(prev => {
          const newGhosts = { ...prev };
          Object.keys(newGhosts).forEach(ghostName => {
            newGhosts[ghostName] = {
              ...newGhosts[ghostName],
              state: FRIGHTENED
            };
          });
          return newGhosts;
        });
      }
    }
    
    // Check for ghost collisions
    Object.values(ghosts).forEach(ghost => {
      if (checkCollision(pacman, ghost)) {
        if (ghost.state === FRIGHTENED) {
          // Eat ghost
          setScore(prev => prev + 200);
          setGhosts(prev => {
            const newGhosts = { ...prev };
            newGhosts[Object.keys(newGhosts).find(key => newGhosts[key] === ghost)] = {
              ...ghostStartPositions[Object.keys(newGhosts).find(key => newGhosts[key] === ghost)],
              x: ghostStartPositions[Object.keys(newGhosts).find(key => newGhosts[key] === ghost)].x * CELL_SIZE,
              y: ghostStartPositions[Object.keys(newGhosts).find(key => newGhosts[key] === ghost)].y * CELL_SIZE,
              state: SCATTER
            };
            return newGhosts;
          });
        } else {
          // Lose a life
          setLives(prev => prev - 1);
          if (lives <= 1) {
            setGameState(GAME_OVER);
            if (onGameOver) onGameOver(score);
            if (onScore) onScore(score);
          } else {
            resetGame();
          }
        }
      }
    });
  }, [pacman, ghosts, grid, frightTime, canMove, getGridPosition, checkCollision, lives, dots, score, resetGame, onGameOver, onScore]);

  // Update ghost positions and behaviors
  const updateGhosts = useCallback((deltaTime) => {
    setGhosts(prev => {
      const newGhosts = { ...prev };
      
      Object.keys(newGhosts).forEach(ghostName => {
        const ghost = newGhosts[ghostName];
        let target;
        
        if (frightTime === 0 && ghost.state === FRIGHTENED) {
          ghost.state = SCATTER;
        }
        
        // Determine target based on ghost state and type
        if (ghost.state === FRIGHTENED) {
          // Random target when frightened
          target = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
          };
        } else if (ghost.state === SCATTER) {
          // Each ghost has a different corner to scatter to
          target = ghost.target;
        } else if (ghost.state === CHASE) {
          // Each ghost has different chase behavior
          const pacmanGridPos = getGridPosition(pacman.x, pacman.y);
          
          if (ghostName === 'blinky') {
            // Blinky directly targets Pac-Man
            target = pacmanGridPos;
          } 
          else if (ghostName === 'pinky') {
            // Pinky targets 4 tiles ahead of Pac-Man
            target = {
              x: pacmanGridPos.x + 4 * pacman.direction.x,
              y: pacmanGridPos.y + 4 * pacman.direction.y
            };
          }
          else if (ghostName === 'inky') {
            // Inky targets based on Blinky's position
            const blinkyGridPos = getGridPosition(newGhosts.blinky.x, newGhosts.blinky.y);
            const twoAhead = {
              x: pacmanGridPos.x + 2 * pacman.direction.x,
              y: pacmanGridPos.y + 2 * pacman.direction.y
            };
            
            target = {
              x: twoAhead.x + (twoAhead.x - blinkyGridPos.x),
              y: twoAhead.y + (twoAhead.y - blinkyGridPos.y)
            };
          }
          else if (ghostName === 'clyde') {
            // Clyde targets Pac-Man when far, but his scatter target when close
            const distance = Math.sqrt(
              Math.pow(pacmanGridPos.x - getGridPosition(ghost.x, ghost.y).x, 2) +
              Math.pow(pacmanGridPos.y - getGridPosition(ghost.x, ghost.y).y, 2)
            );
            
            if (distance > 8) {
              target = pacmanGridPos;
            } else {
              target = ghost.target;
            }
          }
        }
        
        // Get best direction to target
        const bestDirection = getBestDirection(ghost, target);
        
        // Set ghost's new direction
        ghost.direction = bestDirection;
        
        // Move ghost
        const speed = ghost.state === FRIGHTENED ? GHOST_FRIGHTENED_SPEED : GHOST_SPEED;
        let newX = ghost.x + ghost.direction.x * speed;
        let newY = ghost.y + ghost.direction.y * speed;
        
        // Handle wrap-around
        if (newX < -CELL_SIZE) newX = GAME_WIDTH;
        else if (newX > GAME_WIDTH) newX = -CELL_SIZE;
        
        ghost.x = newX;
        ghost.y = newY;
      });
      
      // Periodically alternate between CHASE and SCATTER states
      const totalTime = Math.floor(Date.now() / 1000) % 30;
      if (totalTime >= 20 && frightTime === 0) {
        Object.keys(newGhosts).forEach(ghostName => {
          if (newGhosts[ghostName].state !== FRIGHTENED) {
            newGhosts[ghostName].state = CHASE;
          }
        });
      } else if (frightTime === 0) {
        Object.keys(newGhosts).forEach(ghostName => {
          if (newGhosts[ghostName].state !== FRIGHTENED) {
            newGhosts[ghostName].state = SCATTER;
          }
        });
      }
      
      return newGhosts;
    });
  }, [frightTime, getBestDirection, getGridPosition, pacman]);

  // Draw the entire game
  const drawGame = useCallback((ctx) => {
    // Draw maze
    drawMaze(ctx);
    
    // Draw Pac-Man
    drawPacman(ctx);
    
    // Draw ghosts
    Object.entries(ghosts).forEach(([name, ghost]) => {
      drawGhost(ctx, ghost, name);
    });
    
    // Draw game messages
    if (gameState === READY) {
      drawText(ctx, "READY!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
      drawText(ctx, "Press ENTER to start", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, 16);
    } else if (gameState === PAUSED) {
      drawText(ctx, "PAUSED", GAME_WIDTH / 2, GAME_HEIGHT / 2);
      drawText(ctx, "Press P to resume", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, 16);
    } else if (gameState === GAME_OVER) {
      drawText(ctx, "GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2);
      drawText(ctx, "Press ENTER to restart", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, 16);
    } else if (gameState === WIN) {
      drawText(ctx, "YOU WIN!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
      drawText(ctx, "Press ENTER for next level", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, 16);
    }
    
    // Draw score and lives
    drawScore(ctx);
  }, [gameState, ghosts, pacman, grid]);

  // Draw the maze and dots
  const drawMaze = useCallback((ctx) => {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const cell = grid[y][x];
        
        if (cell === WALL) {
          ctx.fillStyle = COLORS.wall;
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else if (cell === DOT) {
          ctx.fillStyle = COLORS.dot;
          ctx.beginPath();
          ctx.arc(
            x * CELL_SIZE + CELL_SIZE / 2, 
            y * CELL_SIZE + CELL_SIZE / 2, 
            CELL_SIZE / 10, 
            0, 
            Math.PI * 2
          );
          ctx.fill();
        } else if (cell === POWER_PELLET) {
          ctx.fillStyle = COLORS.powerPellet;
          ctx.beginPath();
          ctx.arc(
            x * CELL_SIZE + CELL_SIZE / 2, 
            y * CELL_SIZE + CELL_SIZE / 2, 
            CELL_SIZE / 3, 
            0, 
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
  }, [grid]);

  // Draw Pac-Man
  const drawPacman = useCallback((ctx) => {
    ctx.fillStyle = COLORS.pacman;
    ctx.beginPath();
    
    const mouthAngle = pacman.mouthOpen * Math.PI;
    
    ctx.arc(
      pacman.x + CELL_SIZE / 2, 
      pacman.y + CELL_SIZE / 2, 
      CELL_SIZE / 2, 
      pacman.angle + mouthAngle, 
      pacman.angle + 2 * Math.PI - mouthAngle
    );
    
    ctx.lineTo(pacman.x + CELL_SIZE / 2, pacman.y + CELL_SIZE / 2);
    ctx.fill();
  }, [pacman]);

  // Draw a ghost
  const drawGhost = useCallback((ctx, ghost, name) => {
    // Determine ghost color
    let color;
    if (ghost.state === FRIGHTENED) {
      color = frightTime < 2 ? COLORS.frightenenedEnd : COLORS.frightened;
      if (frightTime < 2 && Math.floor(Date.now() / 200) % 2 === 0) {
        color = COLORS[name];
      }
    } else {
      color = COLORS[name];
    }
    
    // Draw ghost body
    ctx.fillStyle = color;
    ctx.beginPath();
    
    // Head
    ctx.arc(
      ghost.x + CELL_SIZE / 2,
      ghost.y + CELL_SIZE / 2 - 2,
      CELL_SIZE / 2,
      Math.PI,
      0,
      false
    );
    
    // Bottom with waves
    const bottomY = ghost.y + CELL_SIZE / 2 - 2;
    ctx.lineTo(ghost.x + CELL_SIZE, ghost.y + CELL_SIZE);
    ctx.lineTo(ghost.x + CELL_SIZE * 3/4, ghost.y + CELL_SIZE * 3/4);
    ctx.lineTo(ghost.x + CELL_SIZE / 2, ghost.y + CELL_SIZE);
    ctx.lineTo(ghost.x + CELL_SIZE / 4, ghost.y + CELL_SIZE * 3/4);
    ctx.lineTo(ghost.x, ghost.y + CELL_SIZE);
    ctx.lineTo(ghost.x, bottomY);
    
    ctx.fill();
    
    // Draw eyes
    const eyeY = ghost.y + CELL_SIZE * 0.4;
    
    // Direction affects eye position
    let leftEyeX = ghost.x + CELL_SIZE * 0.3;
    let rightEyeX = ghost.x + CELL_SIZE * 0.7;
    let eyeOffsetX = 0;
    let eyeOffsetY = 0;
    
    if (ghost.direction === LEFT) eyeOffsetX = -1;
    else if (ghost.direction === RIGHT) eyeOffsetX = 1;
    else if (ghost.direction === UP) eyeOffsetY = -1;
    else if (ghost.direction === DOWN) eyeOffsetY = 1;
    
    // Eye whites
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, CELL_SIZE * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(rightEyeX, eyeY, CELL_SIZE * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    if (ghost.state !== FRIGHTENED) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(
        leftEyeX + eyeOffsetX * 3, 
        eyeY + eyeOffsetY * 3, 
        CELL_SIZE * 0.07, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(
        rightEyeX + eyeOffsetX * 3, 
        eyeY + eyeOffsetY * 3, 
        CELL_SIZE * 0.07, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
    } else {
      // Draw frightened eyes (crosses)
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      
      // Left eye X
      ctx.beginPath();
      ctx.moveTo(leftEyeX - 3, eyeY - 3);
      ctx.lineTo(leftEyeX + 3, eyeY + 3);
      ctx.moveTo(leftEyeX + 3, eyeY - 3);
      ctx.lineTo(leftEyeX - 3, eyeY + 3);
      ctx.stroke();
      
      // Right eye X
      ctx.beginPath();
      ctx.moveTo(rightEyeX - 3, eyeY - 3);
      ctx.lineTo(rightEyeX + 3, eyeY + 3);
      ctx.moveTo(rightEyeX + 3, eyeY - 3);
      ctx.lineTo(rightEyeX - 3, eyeY + 3);
      ctx.stroke();
    }
  }, [frightTime]);

  // Draw centered text
  const drawText = useCallback((ctx, text, x, y, size = 24) => {
    ctx.fillStyle = COLORS.text;
    ctx.font = `${size}px 'Press Start 2P', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  }, []);

  // Draw score and lives
  const drawScore = useCallback((ctx) => {
    ctx.fillStyle = COLORS.score;
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${score}`, 10, 20);
    ctx.fillText(`LEVEL: ${level}`, 10, 40);
    
    // Draw lives
    for (let i = 0; i < lives; i++) {
      ctx.fillStyle = COLORS.life;
      ctx.beginPath();
      ctx.arc(
        GAME_WIDTH - 20 - i * 25, 
        20, 
        CELL_SIZE / 2.5, 
        0.2 * Math.PI, 
        1.8 * Math.PI
      );
      ctx.lineTo(GAME_WIDTH - 20 - i * 25, 20);
      ctx.fill();
    }
  }, [score, lives, level]);

  // Get angle from direction for Pac-Man
  const getAngleFromDirection = useCallback((direction) => {
    if (direction === RIGHT) return 0;
    if (direction === DOWN) return Math.PI / 2;
    if (direction === LEFT) return Math.PI;
    if (direction === UP) return Math.PI * 3 / 2;
    return 0;
  }, []);
  
  // Handle game state changes
  useEffect(() => {
    if (gameState === WIN) {
      const timer = setTimeout(() => {
        startNewLevel();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState, startNewLevel]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-surface-900">
      <div className="mb-4 text-lg text-surface-200">
        {gameState === READY && "Press ENTER to Start"}
        {gameState === PLAYING && "Use Arrow Keys to Move"}
        {gameState === PAUSED && "PAUSED - Press P to Resume"}
        {gameState === GAME_OVER && "GAME OVER - Press ENTER to Restart"}
        {gameState === WIN && "LEVEL COMPLETE!"}
      </div>
      
      <canvas 
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="border-4 border-primary rounded-lg"
      />
      
      <div className="mt-4 flex space-x-4">
        <div className="text-surface-200">
          <span className="text-primary mr-2">Score:</span> {score}
        </div>
        <div className="text-surface-200">
          <span className="text-primary mr-2">Level:</span> {level}
        </div>
        <div className="text-surface-200">
          <span className="text-primary mr-2">Lives:</span> {lives}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-surface-400">
        <p>Controls: Arrow Keys = Move, P = Pause, ENTER = Start/Restart</p>
      </div>
    </div>
  );
};

export default PacMan;