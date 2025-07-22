const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize default users if they don't exist
    await initializeDefaultData();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const initializeDefaultData = async () => {
  const User = require('../models/User');
  const Typo = require('../models/Typo');

  try {
    // Check if users already exist
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      console.log('📝 Initializing default users...');
      
      const defaultUsers = [
        { name: 'Vivek', title: 'The Admin', isAdmin: true },
        { name: 'Goutham', title: 'King of Typos', isAdmin: false },
        { name: 'Sanjay', title: 'Silent Killer', isAdmin: false },
        { name: 'Sherlock', title: 'Grammar Detective', isAdmin: false },
        { name: 'Venu', title: 'Spelling Rebel', isAdmin: false },
        { name: 'Bittu', title: 'Typo Warrior', isAdmin: false },
        { name: 'Loki', title: 'Mischief Maker', isAdmin: false },
        { name: 'Rajesh', title: 'Grammar Guru', isAdmin: false },
        { name: 'Praneeth', title: 'Word Wizard', isAdmin: false },
        { name: 'Abhishek', title: 'Spelling Sage', isAdmin: false },
        { name: 'Uday', title: 'Typo Titan', isAdmin: false },
        { name: 'Santhosh', title: 'Grammar Guardian', isAdmin: false },
        { name: 'Guneeth', title: 'Silent Assassin', isAdmin: false },
        { name: 'Bugga', title: 'Code Crusher', isAdmin: false },
        { name: 'Prabath', title: 'Spelling Specialist', isAdmin: false }
      ];

      await User.insertMany(defaultUsers);
      console.log('✅ Default users created successfully');

      // Add some sample typos
      const sampleTypos = [
        {
          wrongWord: 'recieve',
          correctWord: 'receive',
          person: 'Goutham',
          context: 'In email about meeting',
          addedBy: 'Vivek'
        },
        {
          wrongWord: 'definately',
          correctWord: 'definitely',
          person: 'Sanjay',
          context: 'Chat message',
          addedBy: 'Sherlock'
        },
        {
          wrongWord: 'seperate',
          correctWord: 'separate',
          person: 'Bittu',
          context: 'Project documentation',
          addedBy: 'Loki'
        },
        {
          wrongWord: 'occured',
          correctWord: 'occurred',
          person: 'Rajesh',
          context: 'Bug report',
          addedBy: 'Praneeth'
        },
        {
          wrongWord: 'neccessary',
          correctWord: 'necessary',
          person: 'Guneeth',
          context: 'Code review comment',
          addedBy: 'Vivek'
        }
      ];

      await Typo.insertMany(sampleTypos);
      console.log('✅ Sample typos created successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing default data:', error);
  }
};

module.exports = connectDB;