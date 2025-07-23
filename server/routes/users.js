const express = require('express');
const User = require('../models/User');
const Typo = require('../models/Typo');
const router = express.Router();

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    
    // Transform MongoDB documents to match frontend expectations
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      title: user.title,
      isAdmin: user.isAdmin
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    // Get typo counts using MongoDB aggregation grouped by person
    const typoCounts = await Typo.aggregate([
      {
        $project: {
          normalizedPerson: {
            $toLower: {
              $trim: { input: '$person' }
            }
          }
        }
      },
      {
        $group: {
          _id: '$normalizedPerson',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get all users to lookup titles
    const users = await User.find();

    // Convert users to a map for quick lookup by normalized name
    const userMap = {};
    users.forEach(user => {
      const normalizedUserName = user.name.trim().toLowerCase();
      userMap[normalizedUserName] = user;
    });

    // Calculate total typos
    const totalTypos = await Typo.countDocuments();

    // Create a map of typo counts by normalized person
    const typoCountMap = {};
    typoCounts.forEach(item => {
      typoCountMap[item._id] = item.count;
    });

    // Create leaderboard including all users, with zero count if no typos
    const leaderboard = users.map(user => {
      const normalizedUserName = user.name.trim().toLowerCase();
      const count = typoCountMap[normalizedUserName] || 0;
      return {
        person: user.name,
        count: count,
        title: user.title,
        percentage: totalTypos > 0 ? Math.round((count / totalTypos) * 100) : 0
      };
    });

    // Sort by typo count (descending)
    leaderboard.sort((a, b) => b.count - a.count);

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

const bcrypt = require('bcrypt');
require('dotenv').config();

/* Removed admin login route as per request */

module.exports = router;
