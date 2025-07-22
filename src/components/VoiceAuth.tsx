import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Shield, Zap, Eye } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

interface VoiceAuthProps {
  onAuthenticated: () => void;
}

const SECRET_PASSWORD = 'drunken monkeys';

const SECURITY_MESSAGES = [
  'SCANNING VOICE PATTERNS...',
  'ANALYZING VOCAL SIGNATURE...',
  'CHECKING AUTHORIZATION LEVEL...',
  'VERIFYING IDENTITY...',
  'PROCESSING BIOMETRIC DATA...'
];

export const VoiceAuth: React.FC<VoiceAuthProps> = ({ onAuthenticated }) => {
  const { isListening, transcript, isSupported, startListening } = useVoiceRecognition();
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'denied'>('idle');
  const [securityMessage, setSecurityMessage] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isListening) {
      setAuthStatus('scanning');
      let messageIndex = 0;
      let progress = 0;
      
      const scanInterval = setInterval(() => {
        setSecurityMessage(SECURITY_MESSAGES[messageIndex]);
        messageIndex = (messageIndex + 1) % SECURITY_MESSAGES.length;
        progress += 20;
        setScanProgress(progress);
        
        if (progress >= 100) {
          clearInterval(scanInterval);
        }
      }, 800);

      return () => clearInterval(scanInterval);
    }
  }, [isListening]);

  useEffect(() => {
    if (transcript) {
      const normalizedTranscript = transcript.toLowerCase().trim();
      const normalizedPassword = SECRET_PASSWORD.toLowerCase();
      
      if (normalizedTranscript.includes(normalizedPassword)) {
        setAuthStatus('success');
        setSecurityMessage('ACCESS GRANTED - WELCOME TO THE VAULT');
        setTimeout(() => {
          onAuthenticated();
        }, 3000);
      } else {
        setAuthStatus('denied');
        setSecurityMessage('ACCESS DENIED - UNAUTHORIZED VOICE DETECTED');
        setTimeout(() => {
          setAuthStatus('idle');
          setSecurityMessage('');
          setScanProgress(0);
        }, 3000);
      }
    }
  }, [transcript, onAuthenticated]);

  const getStatusColor = () => {
    switch (authStatus) {
      case 'scanning': return 'from-yellow-400 to-orange-500';
      case 'success': return 'from-green-400 to-emerald-500';
      case 'denied': return 'from-red-400 to-red-600';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  const getStatusIcon = () => {
    switch (authStatus) {
      case 'scanning': return <Eye className="w-12 h-12 text-white" />;
      case 'success': return <Shield className="w-12 h-12 text-white" />;
      case 'denied': return <Zap className="w-12 h-12 text-white" />;
      default: return isListening ? <Mic className="w-12 h-12 text-white" /> : <MicOff className="w-12 h-12 text-white" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Matrix-like background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-red-900/10" />
      
      {/* Scanning grid */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            className="absolute w-full h-px bg-green-500"
            style={{ top: `${i * 5}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            className="absolute h-full w-px bg-green-500"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Floating security symbols */}
      <div className="absolute inset-0 overflow-hidden">
        {['🔒', '🛡️', '👁️', '🔐', '⚡', '🔍'].map((symbol, index) => (
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
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-2xl select-none pointer-events-none"
          >
            {symbol}
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          {/* Security Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <motion.h2
              animate={{
                textShadow: [
                  '0 0 10px rgba(34, 197, 94, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.8)',
                  '0 0 10px rgba(34, 197, 94, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-400 mb-4 font-mono"
            >
              SECURITY FIREWALL
            </motion.h2>
            <div className="text-green-400 font-mono text-lg">
              {'>'} VOICE AUTHENTICATION REQUIRED {'<'}
            </div>
          </motion.div>

          {/* Security Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 font-mono text-green-400">
              <div className="text-sm mb-2">SYSTEM STATUS:</div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-lg"
              >
                {securityMessage || 'AWAITING VOICE INPUT...'}
              </motion.div>
              
              {authStatus === 'scanning' && (
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      animate={{ width: `${scanProgress}%` }}
                      className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full"
                    />
                  </div>
                  <div className="text-xs mt-1">{scanProgress}% COMPLETE</div>
                </div>
              )}
            </div>
          </motion.div>

          {!isSupported ? (
            <div className="text-red-400 text-center font-mono">
              <p className="mb-4">⚠️ VOICE RECOGNITION NOT SUPPORTED ⚠️</p>
              <motion.button
                onClick={onAuthenticated}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors border border-red-400"
              >
                EMERGENCY BYPASS
              </motion.button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* Voice Recognition Orb */}
              <motion.div
                className="relative mb-8"
                animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.div
                  className={`w-40 h-40 rounded-full bg-gradient-to-r ${getStatusColor()} p-2`}
                  animate={{
                    boxShadow: authStatus === 'scanning' 
                      ? [
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                          '0 0 0 30px rgba(34, 197, 94, 0)',
                          '0 0 0 0 rgba(239, 68, 68, 0.7)',
                          '0 0 0 30px rgba(239, 68, 68, 0)'
                        ]
                      : isListening 
                        ? ['0 0 0 0 rgba(139, 92, 246, 0.7)', '0 0 0 30px rgba(139, 92, 246, 0)']
                        : '0 0 30px rgba(139, 92, 246, 0.3)'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.button
                    onClick={startListening}
                    disabled={isListening || authStatus === 'scanning' || authStatus === 'success'}
                    className="w-full h-full bg-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {authStatus === 'scanning' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-4 border-transparent border-t-green-400 rounded-full"
                      />
                    )}
                    <motion.div
                      animate={authStatus === 'scanning' ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {getStatusIcon()}
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Voice Transcript */}
              <AnimatePresence>
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center mb-6"
                  >
                    <p className="text-green-400 mb-2 font-mono">VOICE DETECTED:</p>
                    <div className="bg-black/70 border border-green-500/30 px-6 py-3 rounded-lg font-mono text-white">
                      "{transcript}"
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Messages */}
              <AnimatePresence>
                {authStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-8xl mb-4"
                    >
                      🔓
                    </motion.div>
                    <p className="text-green-400 text-2xl font-bold font-mono mb-2">
                      ACCESS GRANTED
                    </p>
                    <p className="text-green-300 font-mono">
                      WELCOME TO THE VAULT, AUTHORIZED USER
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {authStatus === 'denied' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: [0, -10, 10, -10, 10, 0],
                      rotate: [0, -5, 5, -5, 5, 0]
                    }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ x: { duration: 0.5 }, rotate: { duration: 0.5 } }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: 3 }}
                      className="text-8xl mb-4"
                    >
                      🚨
                    </motion.div>
                    <p className="text-red-400 text-2xl font-bold font-mono mb-2">
                      ACCESS DENIED
                    </p>
                    <p className="text-red-300 font-mono">
                      UNAUTHORIZED VOICE PATTERN DETECTED
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};