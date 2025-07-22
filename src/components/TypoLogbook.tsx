import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Calendar, MessageSquare, Skull} from 'lucide-react';
import { api } from '../utils/api';
import type { TypoEntry } from '../types';

interface TypoLogbookProps {
  currentUser: any;
}

export const TypoLogbook: React.FC<TypoLogbookProps> = ({ currentUser }) => {
  const [typos, setTypos] = useState<TypoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    wrongWord: '',
    correctWord: '',
    context: '',
  });

  // State for filtering by person
  const [selectedPerson, setSelectedPerson] = useState<string>('All');

  // Get unique persons from typos
  const uniquePersons = Array.from(new Set(typos.map((t) => t.person)));

  // Filter typos based on selected person
  const filteredTypos = selectedPerson === 'All'
    ? typos
    : typos.filter((t) => t.person === selectedPerson);

  useEffect(() => {
    fetchTypos();
  }, []);

  const fetchTypos = async () => {
    try {
      const data = await api.getTypos();
      setTypos(data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error('Error fetching typos:', error);
      // Fallback data
      setTypos([
        {
          id: '1',
          wrongWord: 'recieve',
          correctWord: 'receive',
          person: 'Goutham',
          context: 'In email about meeting',
          timestamp: new Date('2024-01-15'),
          addedBy: 'Vivek'
        },
        {
          id: '2',
          wrongWord: 'definately',
          correctWord: 'definitely',
          person: 'Sanjay',
          context: 'Chat message',
          timestamp: new Date('2024-01-14'),
          addedBy: 'Sherlock'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (typo: TypoEntry) => {
    setEditingId(typo.id);
    setEditForm({
      wrongWord: typo.wrongWord,
      correctWord: typo.correctWord,
      context: typo.context || '',
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    
    try {
      await api.updateTypo(editingId, editForm);
      setTypos(typos.map(t => t.id === editingId ? { ...t, ...editForm } : t));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating typo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to erase this sin from the chronicles?')) return;
    
    try {
      await api.deleteTypo(id);
      setTypos(typos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting typo:', error);
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

  return (
    <div className="min-h-screen bg-black relative">
      {/* Dark background with floating effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-purple-900/10" />
      
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
              THE CHRONICLES OF SIN
            </motion.h1>
            <p className="text-red-400 text-xl font-mono">
              {'>'} A sacred record of spelling atrocities and grammatical crimes {'<'}
            </p>
          </motion.div>

          {/* Filter Dropdown */}
          <div className="mb-6">
            <label htmlFor="personFilter" className="block mb-2 text-red-400 font-mono">
              Filter by Person:
            </label>
            <select
              id="personFilter"
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-3 py-2 font-mono border border-red-500 focus:outline-none focus:border-red-400"
            >
              <option value="All">All</option>
              {uniquePersons.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>

          {/* Typo Entries */}
          <AnimatePresence>
            <div className="space-y-6">
              {filteredTypos.map((typo, index) => (
                <motion.div
                  key={typo.id}
                  initial={{ opacity: 0, x: -50, rotateX: -90 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  exit={{ opacity: 0, x: 50, rotateX: 90 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border-2 border-red-900/50 shadow-lg relative overflow-hidden"
                >
                  {/* Background glow effect */}
                  <motion.div
                    animate={{ 
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl"
                  />

                  {editingId === typo.id ? (
                    <div className="relative z-10 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-red-400 text-sm mb-2 font-mono">WRONG WORD</label>
                          <input
                            type="text"
                            value={editForm.wrongWord}
                            onChange={(e) => setEditForm({ ...editForm, wrongWord: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-red-500/50 focus:border-red-400 focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-red-400 text-sm mb-2 font-mono">CORRECT WORD</label>
                          <input
                            type="text"
                            value={editForm.correctWord}
                            onChange={(e) => setEditForm({ ...editForm, correctWord: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-red-500/50 focus:border-red-400 focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-red-400 text-sm mb-2 font-mono">CONTEXT</label>
                        <input
                          type="text"
                          value={editForm.context}
                          onChange={(e) => setEditForm({ ...editForm, context: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-red-500/50 focus:border-red-400 focus:outline-none font-mono"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <motion.button
                          onClick={handleUpdate}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-mono"
                        >
                          SAVE
                        </motion.button>
                        <motion.button
                          onClick={() => setEditingId(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-mono"
                        >
                          CANCEL
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex-1">
                        {/* Wrong vs Correct Word */}
                        <div className="flex items-center space-x-4 mb-4">
<motion.span
  animate={{ 
    x: [0, -5, 5, -5, 5, 0],
    textShadow: [
      '0 0 5px rgba(239, 68, 68, 0.8)',
      '0 0 10px rgba(239, 68, 68, 1)',
      '0 0 5px rgba(239, 68, 68, 0.8)'
    ]
  }}
  transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
  className="text-3xl font-bold text-red-400 font-mono"
>
  {typo.wrongWord}
</motion.span>
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-red-400 text-2xl"
                          >
                            →
                          </motion.span>
                          <motion.span
                            animate={{
                              textShadow: [
                                '0 0 5px rgba(34, 197, 94, 0.8)',
                                '0 0 10px rgba(34, 197, 94, 1)',
                                '0 0 5px rgba(34, 197, 94, 0.8)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-3xl font-bold text-green-400 font-mono"
                          >
                            {typo.correctWord}
                          </motion.span>
                        </div>
                        
                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 font-mono">
                          <div className="flex items-center space-x-2">
                            <Skull className="w-4 h-4 text-red-400" />
                            <span className="font-medium text-red-400">{typo.person}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span>{new Date(typo.timestamp).toLocaleDateString()}</span>
                          </div>
                          {typo.context && (
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="w-4 h-4 text-blue-400" />
                              <span className="italic">"{typo.context}"</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500 font-mono">
                          Recorded by: <span className="text-purple-400">{typo.addedBy}</span>
                        </div>
                      </div>

                      {/* Admin Controls */}
                      {currentUser?.isAdmin && (
                        <div className="flex space-x-2 ml-4">
                          <motion.button
                            onClick={() => handleEdit(typo)}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-blue-500/50"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(typo.id)}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors border border-red-500/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Empty State */}
          {typos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                💀
              </motion.div>
              <p className="text-red-400 text-xl font-mono mb-2">
                THE CHRONICLES ARE EMPTY
              </p>
              <p className="text-gray-400 font-mono">
                No sins have been recorded yet. The vault awaits its first victim...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};