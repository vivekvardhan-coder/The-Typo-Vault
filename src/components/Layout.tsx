import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Plus, 
  Trophy, 
  User, 
  LogOut, 
  Menu, 
  X,
  Skull
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: any;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentUser,
  currentPage,
  onPageChange,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'logbook', label: 'Typo Chronicles', icon: Book },
    { id: 'add', label: 'Record Sin', icon: Plus },
    { id: 'leaderboard', label: 'Hall of Shame', icon: Trophy },
  ];

  const NavButton: React.FC<{ item: any; isMobile?: boolean }> = ({ item, isMobile = false }) => (
    <motion.button
      onClick={() => {
        onPageChange(item.id);
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 font-mono relative overflow-hidden ${
        currentPage === item.id
          ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg shadow-red-500/25'
          : 'text-gray-300 hover:bg-gray-800 hover:text-red-400 border border-gray-700 hover:border-red-500/50'
      }`}
    >
      {currentPage === item.id && (
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      )}
      <item.icon className="w-5 h-5 relative z-10" />
      <span className="relative z-10">{item.label}</span>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-black relative">
      {/* Dark mystical background */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-900/10 via-black to-purple-900/10" />
      
      {/* Floating skull effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-red-500/20 text-4xl select-none"
          >
            💀
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-40 bg-black/90 backdrop-blur-sm border-b border-red-900/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  boxShadow: [
                    '0 0 10px rgba(239, 68, 68, 0.5)',
                    '0 0 20px rgba(239, 68, 68, 0.8)',
                    '0 0 10px rgba(239, 68, 68, 0.5)'
                  ]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center"
              >
                <Skull className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-red-400 font-bold text-xl hidden sm:block font-mono">
                TYPO VAULT
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 text-gray-300 font-mono">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <User className="w-5 h-5 text-red-400" />
                </motion.div>
                <div className="text-sm">
                  <span className="text-red-400">{currentUser?.name}</span>
                  {currentUser?.isAdmin && (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold"
                    >
                      👑 ADMIN
                    </motion.span>
                  )}
                </div>
              </div>

              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 hover:border-red-500/50"
                title="Exit Vault"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-red-900/50 bg-black/95 backdrop-blur-sm"
            >
              <div className="px-4 py-3 space-y-2">
                {navigation.map((item) => (
                  <NavButton key={item.id} item={item} isMobile />
                ))}
                
                <div className="pt-3 border-t border-red-900/50">
                  <div className="flex items-center space-x-2 text-gray-300 text-sm font-mono">
                    <User className="w-4 h-4 text-red-400" />
                    <span>
                      <span className="text-red-400">{currentUser?.name}</span>
                      {currentUser?.isAdmin && (
                        <span className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold">
                          👑 ADMIN
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};