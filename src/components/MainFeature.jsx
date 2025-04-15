import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy, Users, Clock } from 'lucide-react';
import TetrisSVG from './svg/TetrisSVG';

const MainFeature = () => {
  return (
    <section className="relative rounded-2xl overflow-hidden border border-primary/30">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left - Game Preview */}
        <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-6 md:p-8">
          <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-br-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-tl-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block bg-primary text-surface-900 px-3 py-1 rounded-md text-sm font-medium mb-2">
                FEATURED GAME
              </span>
              <h2 className="text-3xl font-heading text-primary">Tetris</h2>
              <p className="text-surface-300 mt-1">The classic puzzle game that started it all</p>
            </motion.div>
            
            <div className="flex gap-8 mb-8">
              <div>
                <p className="text-sm text-surface-400 mb-1">Release Year</p>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-primary" />
                  <span className="font-medium">1984</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-surface-400 mb-1">High Score</p>
                <div className="flex items-center">
                  <Trophy size={16} className="mr-2 text-yellow-400" />
                  <span className="font-medium">999,999</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-surface-400 mb-1">Players</p>
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-accent" />
                  <span className="font-medium">10M+</span>
                </div>
              </div>
            </div>
            
            <p className="text-surface-100 mb-6">
              Align falling blocks to create complete rows without gaps. As lines are cleared, the game speeds up, testing your reflexes and strategic thinking.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button className="arcade-btn-primary flex items-center">
                PLAY NOW
                <ChevronRight size={18} className="ml-1" />
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Right - Game Illustration */}
        <div className="relative bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-4/5 h-4/5 relative"
          >
            <div className="absolute inset-0 bg-surface-800/50 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
              <TetrisSVG className="w-full h-full object-cover transform scale-110" />
            </div>
            <div className="absolute -right-4 -top-4 bg-accent/80 backdrop-blur-sm text-surface-900 font-pixel px-4 py-2 rounded-md rotate-12 shadow-glow">
              CLASSIC
            </div>
            <div className="absolute -left-4 -bottom-4 bg-primary/80 backdrop-blur-sm text-surface-900 font-pixel px-4 py-2 rounded-md -rotate-12 shadow-glow">
              ADDICTIVE
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainFeature;