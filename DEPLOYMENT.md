# 🚀 Deployment Guide - Typo Vault

This guide will help you deploy your Typo Vault application globally so your friends can access it from anywhere in the world.

## 📋 Prerequisites

Before deploying, you'll need accounts on:
- [MongoDB Atlas](https://www.mongodb.com/atlas) (Free tier available)
- [Render](https://render.com) or [Railway](https://railway.app) (Backend hosting)
- [Vercel](https://vercel.com) or [Netlify](https://netlify.com) (Frontend hosting)

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "Typo Vault"

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to your location)
4. Name your cluster (e.g., "typo-vault-cluster")
5. Click "Create Cluster"

### 1.3 Setup Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### 1.4 Setup Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for simplicity)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

## 🖥️ Step 2: Deploy Backend (Render)

### 2.1 Prepare Backend for Deployment
1. Make sure your `server/.env` file has the MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster-url/typo-vault?retryWrites=true&w=majority
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

### 2.2 Deploy to Render
1. Go to [Render](https://render.com) and sign up
2. Connect your GitHub account
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure the service:
   - **Name**: `typo-vault-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.3 Add Environment Variables
In Render dashboard, go to "Environment" and add:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`
- `FRONTEND_URL`: (You'll update this after frontend deployment)

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://typo-vault-api.onrender.com`)

## 🌐 Step 3: Deploy Frontend (Vercel)

### 3.1 Prepare Frontend for Deployment
1. Create `.env` file in root directory:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### 3.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Add Environment Variables
In Vercel dashboard, go to "Settings" → "Environment Variables":
- `VITE_API_URL`: Your backend URL from Render

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your frontend URL (e.g., `https://typo-vault.vercel.app`)

## 🔄 Step 4: Update Backend CORS

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend service

## ✅ Step 5: Test Your Deployment

1. Visit your frontend URL
2. Test the voice authentication with "Welcome God"
3. Try adding a typo
4. Check if data persists after refresh
5. Share the URL with your friends!

## 🎉 Step 6: Share with Friends

Send your friends the frontend URL and they can:
- Access from anywhere in the world
- Add typos to the shared database
- View the leaderboard
- See real-time updates

## 🛠️ Alternative Deployment Options

### Backend Alternatives:
- **Railway**: Similar to Render, good performance
- **Heroku**: Classic option (has free tier limitations)
- **DigitalOcean App Platform**: More advanced option

### Frontend Alternatives:
- **Netlify**: Similar to Vercel, great for static sites
- **GitHub Pages**: Free but limited features
- **Firebase Hosting**: Good integration with other Google services

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `FRONTEND_URL` in backend matches your actual frontend URL
2. **Database Connection**: Verify MongoDB Atlas IP whitelist includes "0.0.0.0/0"
3. **Environment Variables**: Double-check all env vars are set correctly
4. **Build Failures**: Check logs in deployment dashboard

### Debug Steps:
1. Check backend health: `https://your-backend-url.onrender.com/api/health`
2. Test API directly: `https://your-backend-url.onrender.com/api/users`
3. Check browser console for frontend errors
4. Verify environment variables in deployment dashboards

## 💰 Cost Breakdown

### Free Tier Limits:
- **MongoDB Atlas**: 512MB storage (plenty for typos)
- **Render**: 750 hours/month (enough for personal use)
- **Vercel**: Unlimited static deployments

### When You Might Need to Upgrade:
- High traffic (many friends using frequently)
- Need faster performance
- Want custom domains
- Need more database storage

## 🔐 Security Notes

- MongoDB Atlas connection string contains credentials - keep it secret
- Consider adding authentication for admin features in the future
- Current setup allows anyone with URL to access - fine for friend groups
- For production apps, implement proper user authentication

---

**🎊 Congratulations!** Your Typo Vault is now live and accessible worldwide. Your friends can now immortalize their spelling mistakes for all eternity! 

Share the URL and watch the typo collection grow! 📝✨