require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:5173', 'https://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const typosRoutes = require('./routes/typos');
const usersRoutes = require('./routes/users');

app.use('/api/typos', typosRoutes);
app.use('/api/users', usersRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Typo Vault API is running',
    environment: process.env.NODE_ENV || 'development',
    database: 'MongoDB Atlas'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Typo Vault API server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📖 API Documentation:`);
  console.log(`   GET    /api/typos          - Get all typos`);
  console.log(`   POST   /api/typos          - Add new typo`);
  console.log(`   PUT    /api/typos/:id      - Update typo`);
  console.log(`   DELETE /api/typos/:id      - Delete typo`);
  console.log(`   GET    /api/users          - Get all users`);
  console.log(`   GET    /api/leaderboard    - Get leaderboard`);
  console.log(`   GET    /api/health         - Health check`);
});