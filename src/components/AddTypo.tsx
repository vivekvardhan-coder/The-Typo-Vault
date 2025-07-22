import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Save, Skull, Zap } from 'lucide-react';
import { api } from '../utils/api';

interface AddTypoProps {
  currentUser: any;
  onTypoAdded: () => void;
}

export const AddTypo: React.FC<AddTypoProps> = ({ currentUser, onTypoAdded }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({
    wrongWord: '',
    correctWord: '',
    person: '',
    context: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await api.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
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
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.wrongWord || !form.correctWord || !form.person) {
      alert('Please fill in all required fields to complete the ritual');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.addTypo({
        wrongWord: form.wrongWord,
        correctWord: form.correctWord,
        person: form.person,
        context: form.context,
        addedBy: currentUser?.name || 'Unknown',
      });

      setForm({
        wrongWord: '',
        correctWord: '',
        person: '',
        context: '',
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onTypoAdded();
      }, 3000);
    } catch (error) {
      console.error('Error adding typo:', error);
      alert('Failed to record the sin. The dark forces are resisting...');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Dark mystical background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-purple-900/10" />
      
      {/* Floating sin symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['💀', '🔥', '⚡', '🗡️', '💎', '🌟'].map((symbol, index) => (
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
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-3xl select-none"
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
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
              RECORD A NEW SIN
            </motion.h1>
            <p className="text-red-400 text-xl font-mono">
              {'>'} Document the latest spelling atrocity for eternal shame {'<'}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-8 border-2 border-red-900/50 shadow-lg relative overflow-hidden"
          >
            {/* Background glow */}
            <motion.div
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl"
            />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Wrong and Correct Word */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-red-400 text-sm font-medium mb-2 font-mono flex items-center space-x-2">
                    <Skull className="w-4 h-4" />
                    <span>WRONG WORD *</span>
                  </label>
                  <motion.input
                    type="text"
                    value={form.wrongWord}
                    onChange={(e) => setForm({ ...form, wrongWord: e.target.value })}
                    whileFocus={{ scale: 1.02, borderColor: '#ef4444' }}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-red-900/50 focus:border-red-400 focus:outline-none transition-all font-mono"
                    placeholder="The misspelled abomination"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-green-400 text-sm font-medium mb-2 font-mono flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>CORRECT WORD *</span>
                  </label>
                  <motion.input
                    type="text"
                    value={form.correctWord}
                    onChange={(e) => setForm({ ...form, correctWord: e.target.value })}
                    whileFocus={{ scale: 1.02, borderColor: '#22c55e' }}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-green-900/50 focus:border-green-400 focus:outline-none transition-all font-mono"
                    placeholder="The righteous spelling"
                    required
                  />
                </motion.div>
              </div>

              {/* Culprit Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-purple-400 text-sm font-medium mb-2 font-mono">
                  CULPRIT *
                </label>
                <motion.select
                  value={form.person}
                  onChange={(e) => setForm({ ...form, person: e.target.value })}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-purple-900/50 focus:border-purple-400 focus:outline-none transition-all font-mono"
                  required
                >
                  <option value="">Select the perpetrator of this crime</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name} - {user.title}
                    </option>
                  ))}
                </motion.select>
              </motion.div>

              {/* Context */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-blue-400 text-sm font-medium mb-2 font-mono">
                  CONTEXT OF THE CRIME (Optional)
                </label>
                <motion.textarea
                  value={form.context}
                  onChange={(e) => setForm({ ...form, context: e.target.value })}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-blue-900/50 focus:border-blue-400 focus:outline-none transition-all resize-none font-mono"
                  rows={3}
                  placeholder="Where did this atrocity occur? (e.g., 'In email about project deadline')"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg font-bold hover:from-red-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-lg border-2 border-red-500/50 relative overflow-hidden"
                >
                  {isSubmitting && (
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>RECORDING SIN...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6" />
                      <span>COMMIT TO ETERNAL RECORD</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-xl text-center border-2 border-green-400 relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-4 relative z-10"
              >
                ✅
              </motion.div>
              <h3 className="text-3xl font-bold mb-2 font-mono relative z-10">SIN RECORDED!</h3>
              <p className="text-xl font-mono relative z-10">The atrocity has been committed to the eternal chronicles.</p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mt-4 text-green-200 font-mono relative z-10"
              >
                Returning to the vault...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};