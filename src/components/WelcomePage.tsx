import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';

interface WelcomePageProps {
  onEnter: () => void;
}

const FLOATING_TYPOS = [
  'recieve', 'definately', 'seperate', 'occured', 'neccessary', 'accomodate',
  'embarass', 'maintainance', 'existance', 'independant', 'begining', 'calender',
  'cemetary', 'concious', 'dilemna', 'enviroment', 'goverment', 'harrass',
  'liason', 'millenium', 'noticable', 'occassion', 'priviledge', 'rythm',
  'tommorrow', 'untill', 'wierd', 'acheive', 'beleive', 'freind'
];

export const WelcomePage: React.FC<WelcomePageProps> = ({ onEnter }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [glitchText, setGlitchText] = useState('The Typo Vault');

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 1000);
    
    // Glitch effect for title
    const glitchInterval = setInterval(() => {
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const original = 'The Typo Vault';
      let glitched = '';
      
      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += original[i];
        }
      }
      
      setGlitchText(glitched);
      setTimeout(() => setGlitchText(original), 100);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />
      
      {/* Floating Typos Background */}
      <div className="absolute inset-0 overflow-hidden">
        {FLOATING_TYPOS.map((typo, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{
              y: -100,
              opacity: [0, 0.3, 0.6, 0.3, 0],
              rotate: Math.random() * 360 + 180,
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-red-500/40 font-mono text-lg md:text-2xl font-bold select-none pointer-events-none"
            style={{
              textShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
              filter: 'blur(0.5px)'
            }}
          >
            {typo}
          </motion.div>
        ))}
      </div>

      {/* Lightning Effects */}
      <motion.div
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3
        }}
        className="absolute inset-0 bg-white/5 pointer-events-none"
      />

      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Skull Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <div className="text-8xl mb-4">💀</div>
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-red-500 rounded-full mx-auto"
            />
          </motion.div>

          {/* Glitchy Title */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-8"
              >
                <motion.h1
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.8)',
                      '0 0 20px rgba(147, 51, 234, 0.8)',
                      '0 0 10px rgba(239, 68, 68, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-red-500 mb-4 font-mono"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))'
                  }}
                >
                  {glitchText}
                </motion.h1>
                
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl md:text-2xl text-red-400 mb-8 font-mono"
                >
                  <span className="text-red-500">{'>'}</span> Where spelling sins are exposed <span className="text-red-500">{'<'}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing Enter Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 60px rgba(239, 68, 68, 1)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block rounded-full p-1 bg-gradient-to-r from-red-600 via-purple-600 to-red-600"
            >
              <motion.button
                onClick={onEnter}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-red-400 rounded-full text-lg font-bold font-mono border-2 border-red-500/50 hover:border-red-400 transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                />
                <span className="relative z-10">ENTER THE VAULT</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Warning Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 3 }}
            className="mt-12 text-red-500/70 text-sm font-mono"
          >
            ⚠️ AUTHORIZED PERSONNEL ONLY ⚠️
            <br />
            <span className="text-xs text-red-400/50">
              Unauthorized access will result in eternal spelling shame
            </span>
          </motion.div>

          {/* Scanning Lines */}
          <motion.div
            animate={{ y: ['-100vh', '100vh'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};