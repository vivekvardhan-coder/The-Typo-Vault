import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Target, Zap, Skull, Shield } from 'lucide-react';
import { api } from '../utils/api';

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let data = await api.getLeaderboard();

        // Filter out Sherlock
        const sherlockIndex = data.findIndex(entry => entry.person === 'Sherlock');
        let sherlockEntry = null;
        if (sherlockIndex !== -1) {
          sherlockEntry = data.splice(sherlockIndex, 1)[0];
          // Remove Super Overlord title from Sherlock
          if (sherlockEntry.title === 'King of Typos') {
            sherlockEntry.title = '';
          }
        }

        // Sort remaining by count descending
        data.sort((a, b) => b.count - a.count);

        // Append Sherlock at the bottom if exists
        if (sherlockEntry) {
          data.push(sherlockEntry);
        }

        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Fallback data
        let fallbackData = [
          { person: 'Goutham', count: 8, title: 'King of Typos', percentage: 40 },
          { person: 'Sanjay', count: 6, title: 'Silent Killer', percentage: 30 },
          { person: 'Bittu', count: 4, title: 'Typo Warrior', percentage: 20 },
          { person: 'Vivek', count: 2, title: 'The Admin', percentage: 10 },
          { person: 'Sherlock', count: 1, title: '', percentage: 5 }
        ];

        // Sort fallback data by count descending except Sherlock at bottom
        const fallbackSherlockIndex = fallbackData.findIndex(entry => entry.person === 'Sherlock');
        let fallbackSherlockEntry = null;
        if (fallbackSherlockIndex !== -1) {
          fallbackSherlockEntry = fallbackData.splice(fallbackSherlockIndex, 1)[0];
        }
        fallbackData.sort((a, b) => b.count - a.count);
        if (fallbackSherlockEntry) {
          fallbackData.push(fallbackSherlockEntry);
        }

        setLeaderboard(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getTrophyIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 1: return <Skull className="w-8 h-8 text-red-400" />;
      case 2: return <Shield className="w-8 h-8 text-orange-400" />;
      default: return <Zap className="w-8 h-8 text-purple-400" />;
    }
  };

  const getTrophyColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-yellow-600';
      case 1: return 'from-red-400 to-red-600';
      case 2: return 'from-orange-400 to-orange-600';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  const getRankTitle = (index: number) => {
    switch (index) {
      case 0: return '💀 MASTER OF MISTAKES';
      case 1: return '🔥 CHAMPION OF CHAOS';
      case 2: return '⚡ APPRENTICE OF ATROCITY';
      case 3: return '⚡ APPRENTICE OF ATROCITY';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalTypos = leaderboard.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Dark background with floating skulls */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-purple-900/10" />
      
      {/* Floating trophy effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🏆', '💀', '👑', '🔥', '⚡', '🗡️'].map((symbol, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-4xl select-none"
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
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
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-500 to-red-400 mb-4 font-mono"
            >
              HALL OF ETERNAL SHAME
            </motion.h1>
            <p className="text-red-400 text-xl font-mono">
              {'>'} Where spelling legends are born and grammar dies a painful death {'<'}
            </p>
            {/* Total typo count display */}
            <p className="text-yellow-400 text-2xl font-mono mt-4 font-bold">
              Total Typos Committed: {totalTypos}
            </p>
          </motion.div>

          {/* Leaderboard Entries */}
          <div className="space-y-6">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={`${entry.person}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: -90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`relative bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border-2 transition-all duration-500 overflow-hidden ${
                  index === 0 
                    ? 'border-yellow-500 shadow-lg shadow-yellow-500/25' 
                    : index === 1
                    ? 'border-red-500 shadow-lg shadow-red-500/25'
                    : index === 2
                    ? 'border-orange-500 shadow-lg shadow-orange-500/25'
                    : 'border-purple-500/50 shadow-lg shadow-purple-500/25'
                }`}
              >
                {/* Background glow effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-r ${getTrophyColor(index)}/10 rounded-xl`}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Trophy/Rank Icon */}
                    <div className="relative">
                      <motion.div
                        animate={
                          index === 0 
                            ? { 
                                rotate: [0, -10, 10, -10, 10, 0],
                                scale: [1, 1.1, 1]
                              }
                            : index <= 2
                            ? { scale: [1, 1.05, 1] }
                            : {}
                        }
                        transition={{ 
                          duration: index === 0 ? 2 : 3, 
                          repeat: Infinity, 
                          delay: index * 0.5 
                        }}
                        className={`p-4 rounded-full bg-gradient-to-r ${getTrophyColor(index)} relative overflow-hidden`}
                      >
                        {/* Shimmer effect for top 3 */}
                        {index <= 2 && (
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        )}
                        {getTrophyIcon(index)}
                      </motion.div>
                      
                      {/* Rank Number */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute -top-2 -right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-gray-600 font-mono"
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    {/* User Info */}
                    <div>
                      <motion.h3
                        animate={index === 0 ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl font-bold text-white mb-1 font-mono"
                      >
                        {entry.person}
                      </motion.h3>
                      <p className="text-gray-300 text-sm font-mono mb-2">
                        {entry.title}
                      </p>
                      
                      {/* Special rank title */}
                      <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`text-xs font-bold font-mono ${
                          index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-red-400' :
                          index === 2 ? 'text-orange-400' :
                          'text-purple-400'
                        }`}
                      >
                        {getRankTitle(index)}
                      </motion.div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                      className={`text-5xl font-bold mb-2 font-mono ${
                        index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-red-400' :
                        index === 2 ? 'text-orange-400' :
                        'text-purple-400'
                      }`}
                    >
                      {entry.count}
                    </motion.div>
                    <p className="text-gray-400 text-sm font-mono">
                      SINS COMMITTED
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${entry.percentage}%` }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 1.5, ease: "easeOut" }}
                    className={`h-3 bg-gradient-to-r ${getTrophyColor(index)} rounded-full relative overflow-hidden`}
                  >
                    {/* Animated shimmer */}
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                  <div className="mt-2 text-right text-gray-400 text-sm font-mono">
                    {entry.percentage}% of all recorded sins
                  </div>
                </div>

                {/* Special effects for top 3 */}
                {index <= 2 && (
                  <motion.div
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: Math.random() * 2 
                    }}
                    className="absolute top-2 right-2 text-2xl"
                  >
                    {index === 0 ? '✨' : index === 1 ? '🔥' : '⚡'}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {leaderboard.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>
              <p className="text-red-400 text-xl font-mono mb-2">
                THE HALL OF SHAME AWAITS
              </p>
              <p className="text-gray-400 font-mono">
                No champions yet. The competition for eternal shame awaits...
              </p>
            </motion.div>
          )}

          {/* Achievement Legend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-red-900/50">
              <h3 className="text-2xl font-bold text-red-400 mb-6 font-mono">
                🎯 RANKS OF DISHONOR
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">👑</span>
                  <strong className="text-yellow-400">SUPREME OVERLORD:</strong>
                  <span>Most sins committed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-400">💀</span>
                  <strong className="text-red-400">MASTER OF MISTAKES:</strong>
                  <span>Consistent offender</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400">🔥</span>
                  <strong className="text-orange-400">CHAMPION OF CHAOS:</strong>
                  <span>Creative destruction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">⚡</span>
                  <strong className="text-purple-400">APPRENTICE:</strong>
                  <span>Learning the dark arts</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};