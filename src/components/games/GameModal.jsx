import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameModal = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    
    // Disable scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-surface-900/90"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300 
            }}
            className="relative w-full max-w-5xl max-h-screen overflow-auto rounded-lg border border-primary/30 bg-surface-800"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/20 bg-surface-900 px-6 py-3">
              <h2 className="text-xl font-heading text-primary">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-surface-400 transition-colors hover:bg-surface-700 hover:text-surface-200"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex h-full max-h-[80vh] flex-col items-center justify-center p-6">
              {children}
            </div>
            
            {/* CRT Effects */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-[0.05]"></div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]">
              <div className="animate-scanline h-[2px] w-full bg-white"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;