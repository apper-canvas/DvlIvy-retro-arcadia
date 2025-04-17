import { useState, useEffect } from 'react';
import { Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const GameScore = ({ score, highScore, onClose }) => {
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Animate score counting up
  useEffect(() => {
    if (score > 0) {
      let currentCount = 0;
      const increment = Math.max(1, Math.floor(score / 100)); // Larger increments for bigger scores
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(currentCount);
        }
      }, 10);
      
      return () => clearInterval(timer);
    }
  }, [score]);

  // Check if this is a new high score
  useEffect(() => {
    if (score > highScore) {
      setIsNewHighScore(true);
    }
  }, [score, highScore]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically save the score to your backend
    console.log('Submitting score:', {
      name: playerName || 'Anonymous',
      score: score
    });
    
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-md flex-col items-center rounded-lg border border-primary/30 bg-surface-800/80 p-8 text-center"
    >
      <h2 className="mb-6 text-2xl font-heading text-primary">Game Over</h2>
      
      {/* Score */}
      <div className="mb-8 text-5xl font-bold text-yellow-400">
        {displayScore.toLocaleString()}
      </div>
      
      {/* High Score */}
      {isNewHighScore ? (
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse" 
          }}
          className="mb-6 flex items-center justify-center rounded-md bg-yellow-400/20 p-4 text-yellow-400"
        >
          <Trophy className="mr-2" />
          <span className="text-xl font-bold">NEW HIGH SCORE!</span>
        </motion.div>
      ) : (
        <div className="mb-6 flex items-center justify-center">
          <Trophy className="mr-2 text-primary" />
          <span className="text-surface-300">High Score: {highScore.toLocaleString()}</span>
        </div>
      )}
      
      {/* Submit Score Form */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="playerName" className="mb-2 block text-left text-sm text-surface-300">
              Enter your name:
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={15}
              placeholder="Your name"
              className="w-full rounded border border-primary/30 bg-surface-900 px-4 py-2 text-surface-200 focus:border-primary focus:outline-none"
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-surface-600 bg-surface-700 px-4 py-2 text-surface-300 transition-colors hover:bg-surface-600 hover:text-surface-200"
            >
              Play Again
            </button>
            
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-surface-900 transition-colors hover:bg-primary-light"
            >
              Submit Score
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md bg-green-400/20 p-4 text-green-400">
            Score submitted successfully!
          </div>
          
          <button
            onClick={onClose}
            className="rounded-md bg-primary px-6 py-2 text-surface-900 transition-colors hover:bg-primary-light"
          >
            Play Again
          </button>
        </div>
      )}
      
      {/* Stars decoration */}
      <div className="mt-8 flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400" fill={i < score / 30000 ? "#FACC15" : "none"} />
        ))}
      </div>
    </motion.div>
  );
};

export default GameScore;