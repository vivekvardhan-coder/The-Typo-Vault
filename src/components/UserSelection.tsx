import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, User, Zap, Shield, Skull } from 'lucide-react';
import { api } from '../utils/api';

interface UserSelectionProps {
  onUserSelected: (user: any) => void;
}

const SPECIAL_EFFECTS = ['⚡', '🔥', '💀', '👑', '🗡️', '🛡️', '💎', '🌟'];

export const UserSelection: React.FC<UserSelectionProps> = ({ onUserSelected }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [hoveredUser, setHoveredUser] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await api.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback data
        setUsers([
          { id: '1', name: 'Vivek', title: 'The Admin', isAdmin: true },
          { id: '2', name: 'Goutham', title: 'King of Typos', isAdmin: false },
          { id: '3', name: 'Sanjay', title: 'Silent Killer', isAdmin: false },
          { id: '4', name: 'Sherlock', title: 'Grammar Detective', isAdmin: false },
          { id: '5', name: 'Venu', title: 'Spelling Rebel', isAdmin: false },
          { id: '6', name: 'Bittu', title: 'Typo Warrior', isAdmin: false },
          { id: '7', name: 'Loki', title: 'Mischief Maker', isAdmin: false },
          { id: '8', name: 'Rajesh', title: 'Grammar Guru', isAdmin: false },
          { id: '9', name: 'Praneeth', title: 'Word Wizard', isAdmin: false },
          { id: '10', name: 'Abhishek', title: 'Spelling Sage', isAdmin: false },
          { id: '11', name: 'Uday', title: 'Typo Titan', isAdmin: false },
          { id: '12', name: 'Santhosh', title: 'Grammar Guardian', isAdmin: false },
          { id: '13', name: 'Guneeth', title: 'Silent Assassin', isAdmin: false },
          { id: '14', name: 'Bugga', title: 'Code Crusher', isAdmin: false },
          { id: '15', name: 'Prabath', title: 'Spelling Specialist', isAdmin: false },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user: any) => {
    setSelectedUser(user.id);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Voice welcome
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Welcome back, ${user.title}, ${user.name}. The vault awaits your presence.`
      );
      utterance.rate = 0.8;
      utterance.pitch = 0.7;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => {
      onUserSelected(user);
    }, 2000);
  };

  const getUserIcon = (user: any) => {
    if (user.isAdmin) return Crown;
    if (user.title.includes('Killer') || user.title.includes('Assassin')) return Skull;
    if (user.title.includes('Warrior') || user.title.includes('Titan')) return Shield;
    if (user.title.includes('Detective') || user.title.includes('Guardian')) return Zap;
    return User;
  };

  const getUserColor = (user: any) => {
    if (user.isAdmin) return 'from-yellow-500 to-orange-500';
    if (user.title.includes('Killer') || user.title.includes('Assassin')) return 'from-red-500 to-red-700';
    if (user.title.includes('Warrior') || user.title.includes('Titan')) return 'from-blue-500 to-blue-700';
    if (user.title.includes('Detective') || user.title.includes('Guardian')) return 'from-green-500 to-green-700';
    return 'from-purple-500 to-purple-700';
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dark mystical background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />
      
      {/* Floating effects */}
      <div className="absolute inset-0 overflow-hidden">
        {SPECIAL_EFFECTS.map((effect, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-3xl select-none pointer-events-none"
          >
            {effect}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2
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
              CHOOSE YOUR IDENTITY
            </motion.h2>
            <div className="text-red-400 font-mono text-xl">
              {'>'} Select your avatar to enter the vault {'<'}
            </div>
          </motion.div>

          {/* User Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => {
              const IconComponent = getUserIcon(user);
              const isHovered = hoveredUser === user.id;
              const isSelected = selectedUser === user.id;
              
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="relative"
                >
                  <motion.button
                    onClick={() => handleUserSelect(user)}
                    onHoverStart={() => setHoveredUser(user.id)}
                    onHoverEnd={() => setHoveredUser('')}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      rotateY: 5
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-full p-6 rounded-xl bg-gradient-to-br ${
                      user.name === 'Goutham'
                        ? 'from-yellow-700 to-yellow-900 border-yellow-500 shadow-lg shadow-yellow-500/50'
                        : 'from-gray-900 to-black border-2 transition-all duration-500 overflow-hidden ' +
                          (isSelected
                            ? 'border-red-500 shadow-lg shadow-red-500/25'
                            : isHovered
                            ? 'border-purple-400 shadow-lg shadow-purple-400/25'
                            : 'border-gray-700 hover:border-purple-400')
                    }`}
                  >
                    {/* Background effects */}
                    <motion.div
                      animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 bg-gradient-to-r ${getUserColor(user)} opacity-10`}
                    />

                    {/* Floating particles on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, x: 0, y: 0 }}
                              animate={{ 
                                scale: [0, 1, 0],
                                x: (Math.random() - 0.5) * 200,
                                y: (Math.random() - 0.5) * 200,
                                opacity: [0, 1, 0]
                              }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 2, delay: i * 0.1 }}
                              className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full"
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex items-center space-x-4">
                      <motion.div
                        animate={isHovered ? { rotate: [0, 360], scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1 }}
                        className={`p-4 rounded-full bg-gradient-to-r ${getUserColor(user)} relative`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                        {user.isAdmin && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-1 -right-1 text-yellow-400 text-xl"
                          >
                            ✨
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <div className="text-left flex-1">
                        <motion.h3
                          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                          className="text-2xl font-bold text-white mb-1 font-mono"
                        >
                          {user.name}
                        </motion.h3>
                        <p className="text-gray-300 text-sm font-mono">
                          {user.title}
                        </p>
                        {user.isAdmin && (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold"
                          >
                            👑 ADMIN
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Selection overlay */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 360]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-white text-6xl"
                          >
                            ✓
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Welcome message */}
          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.8)',
                      '0 0 20px rgba(239, 68, 68, 1)',
                      '0 0 10px rgba(239, 68, 68, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-bold text-red-400 mb-4 font-mono"
                >
                  IDENTITY CONFIRMED
                </motion.div>
                <p className="text-xl text-gray-300 font-mono">
                  Welcome back, {users.find(u => u.id === selectedUser)?.title},{' '}
                  <span className="text-purple-400 font-bold">
                    {users.find(u => u.id === selectedUser)?.name}
                  </span>!
                </p>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mt-4 text-red-400 font-mono"
                >
                  Preparing vault access...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};