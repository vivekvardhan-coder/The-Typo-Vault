# 🧠 The Typo Vault  
_The Ultimate Spelling Shame Repository_

[🌐 Visit Live Site](https://the-drunken-monkeys-vault.netlify.app/)  
A mystical, voice-activated vault where spelling crimes are logged and laughed at.  
Built with **React**, **Express**, **MongoDB**, and a touch of **friendly mockery**.

---

## ✨ Features

### 🎭 Mystery Theme Experience
- 🌀 **Animated Welcome Page**: Particle effects and magical transitions
- 🎙️ **Voice-Based Access**: Speak the secret password to unlock the vault
- 🧑‍🎤 **User Identity Selection**: Pick your persona with personalized greetings
- 🌒 **Dark Mystical UI**: Feels like a spellbook came alive

### 📝 Core Functionality
- 📚 **Typo Logbook**: Animated list of typos with shake effects
- ➕ **Add New Typos**: Share new spelling crimes with context
- 🏆 **Leaderboard**: Hall of Shame with fun titles and stats
- 👑 **Admin Panel**: Edit/delete entries (Admin only)

### 🎯 Fun Additions
- 🥇 **Titles & Achievements**: “King of Typos”, “Grammar Rebel”, and more
- 🔊 **Voice Recognition**: Powered by the Web Speech API
- 🖥️ **Responsive Design**: Works across all devices

---

## 🛠️ Tech Stack

- Frontend: **React**, **Tailwind CSS**, **Framer Motion**, **Lucide Icons**
- Backend: **Node.js**, **Express.js**
- Database: **MongoDB Atlas (Cloud)**
- Voice Recognition: **Web Speech API**

---

## 🚀 Quick Start

### ✅ Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn

### 🧾 Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd typo-vault

#### Database Setup
1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and new project
   - Create a cluster (free M0 tier)
   - Setup database user and network access
   - Get your connection string

2. **Configure Environment Variables**
   ```bash
   # In server directory, create .env file
   cd server
   cp .env.example .env
   # Edit .env and add your MongoDB connection string
   ```

#### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd typo-vault
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Start the backend server**
   ```bash
   # In the server directory
   cd server
   npm run dev
   # Or for production:
   npm start
   ```

5. **Start the frontend development server**
   ```bash
   # In the root directory
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

**Note**: The application will automatically create default users and sample data on first run.

## 🎮 How to Use

### 1. Welcome Screen
- Click "Dive into the Vault" to begin your journey

### 2. Voice Authentication
- Click the glowing microphone orb
- Speak the secret password: **"The typo gods forgive me"**
- Wait for the magical access granted animation

### 3. User Selection
- Choose your identity from the predefined list
- Admins get special crown icons and editing privileges

### 4. Main Interface
- **Typo Logbook**: View all recorded spelling crimes
- **Add Typo**: Submit new entries
- **Leaderboard**: See who reigns supreme in the spelling shame

### 5. Admin Features
- Edit existing typo entries
- Delete entries
- Full CRUD control over the vault

## 🏗️ Project Structure

```
typo-vault/
├── src/                     # Frontend React application
│   ├── components/          # React components
│   │   ├── WelcomePage.tsx
│   │   ├── VoiceAuth.tsx
│   │   ├── UserSelection.tsx
│   │   ├── TypoLogbook.tsx
│   │   ├── AddTypo.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Layout.tsx
│   │   └── ParticleBackground.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useVoiceRecognition.ts
│   ├── utils/              # Utility functions
│   │   └── api.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── App.tsx             # Main application component
├── server/                 # Backend Express application
│   ├── routes/             # API route handlers
│   │   ├── typos.js
│   │   └── users.js
│   ├── data/               # JSON data storage
│   │   ├── typos.json
│   │   └── users.json
│   └── server.js           # Express server setup
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3001
NODE_ENV=development
```

### Default Users

The application comes with predefined users (automatically created in MongoDB):
- **Vivek** (Admin) - "The Admin"
- **Goutham** - "King of Typos"
- **Sanjay** - "Silent Killer"
- **Sherlock** - "Grammar Detective"
- **Venu** - "Spelling Rebel"
- **Bittu** - "Typo Warrior"
- **Loki** - "Mischief Maker"
- **Rajesh** - "Grammar Guru"
- **Praneeth** - "Word Wizard"
- **Abhishek** - "Spelling Sage"
- **Uday** - "Typo Titan"
- **Santhosh** - "Grammar Guardian"
- **Guneeth** - "Silent Assassin"
- **Bugga** - "Code Crusher"
- **Prabath** - "Spelling Specialist"

### Secret Password

The voice authentication password is: **"Welcome God"**

## 🎨 Customization

### Adding New Users
Add new users directly to MongoDB or modify the initialization data in `server/config/database.js`:
```javascript
const defaultUsers = [
  // Add your new user here
  { name: 'NewFriend', title: 'Spelling Apprentice', isAdmin: false }
];
```

### Changing Themes
Modify the Tailwind CSS classes in components for different color schemes:
- Purple theme: `from-purple-400 to-pink-500`
- Blue theme: `from-blue-400 to-teal-500`
- Green theme: `from-green-400 to-emerald-500`

### Custom Achievement Titles
Update titles in the database initialization or add logic in `server/routes/users.js` for dynamic titles based on typo patterns.

### Changing Secret Password
Edit `src/components/VoiceAuth.tsx`:
```typescript
const SECRET_PASSWORD = 'your new secret phrase';
```

## 🛠️ API Endpoints

### Typos
- `GET /api/typos` - Get all typos
- `POST /api/typos` - Add new typo
- `PUT /api/typos/:id` - Update typo (admin only)
- `DELETE /api/typos/:id` - Delete typo (admin only)

### Users
- `GET /api/users` - Get all users
- `GET /api/leaderboard` - Get leaderboard with statistics

### Health Check
- `GET /api/health` - Server health status

## 🎯 Browser Compatibility

### Voice Recognition Requirements
- **Chrome/Edge**: Full support ✅
- **Firefox**: Limited support ⚠️
- **Safari**: Limited support ⚠️

*Note: If voice recognition is not supported, users can skip authentication.*

## 🚀 Deployment

**For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

### Quick Deployment Summary:

1. **Database**: Setup MongoDB Atlas (free tier)
2. **Backend**: Deploy to Render/Railway
3. **Frontend**: Deploy to Vercel/Netlify
4. **Configure**: Set environment variables
5. **Share**: Give friends the URL!

### Global Access:
✅ **After deployment, your friends can access from anywhere in the world**
✅ **Data persists permanently in MongoDB Atlas**
✅ **Real-time updates for all users**
✅ **No more local-only limitations**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 🎉 Fun Ideas for Extensions

- **Photo Evidence**: Add image uploads for typo screenshots
- **Typo Categories**: Grammar vs spelling vs autocorrect fails
- **Weekly Challenges**: Special events and competitions
- **Sound Effects**: Add magical sounds for interactions
- **Mobile App**: React Native version
- **Social Features**: Share typos on social media
- **AI Analysis**: Automatically detect typo patterns

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **MongoDB Atlas** for reliable cloud database
- **Framer Motion** for smooth animations
- **Tailwind CSS** for beautiful styling
- **Lucide React** for crisp icons
- **Web Speech API** for voice recognition magic

---

**Remember**: The best typos are the ones that make everyone laugh! 😄

*Built with ❤️ and a healthy sense of humor*
