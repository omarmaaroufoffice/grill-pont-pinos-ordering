# 🚀 Free Deployment Guide

## Quick Deployment Options (All Free!)

### 🥇 **Option 1: Render (Recommended - Easiest)**

**Why Render?**
- ✅ Completely free tier
- ✅ Automatic deployments from GitHub
- ✅ Built-in SSL certificates
- ✅ Easy to set up
- ✅ Handles both frontend and backend

**Steps:**
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/grill-ordering.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Name**: `grill-pont-pinos`
     - **Build Command**: `npm install && cd client && npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: `Node`
   - Click "Create Web Service"

3. **Update QR Code:**
   - After deployment, update `qr-generator.js` with your Render URL
   - Run `node qr-generator.js` to regenerate QR codes

**Your URLs will be:**
- Customer Menu: `https://grill-pont-pinos.onrender.com`
- Admin: `https://grill-pont-pinos.onrender.com/admin`

---

### 🥈 **Option 2: Railway**

**Steps:**
1. **Push to GitHub** (same as above)
2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect and deploy!

**Environment Variables to set:**
- `NODE_ENV`: `production`
- `PORT`: `3000`

---

### 🥉 **Option 3: Vercel + Railway (Split)**

**Frontend on Vercel, Backend on Railway**

**Backend (Railway):**
1. Create new Railway project
2. Deploy only the server folder
3. Set start command: `node server/index.js`

**Frontend (Vercel):**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set build settings:
   - **Framework**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

---

## 🔧 Configuration for Production

### Update API URLs
After deployment, update these files with your production URLs:

**client/src/config.js:**
```javascript
production: {
  API_BASE_URL: 'https://your-app-name.onrender.com',
  SOCKET_URL: 'https://your-app-name.onrender.com'
}
```

### Generate New QR Codes
Update `qr-generator.js`:
```javascript
const menuURL = 'https://your-app-name.onrender.com/';
```

Then run:
```bash
node qr-generator.js
```

---

## 🎯 Post-Deployment Checklist

### ✅ Test Everything:
1. **Customer Flow:**
   - [ ] QR code scans correctly
   - [ ] Menu loads properly
   - [ ] Can add items to cart
   - [ ] Can place orders
   - [ ] Receives order confirmation

2. **Admin Flow:**
   - [ ] Can access `/admin`
   - [ ] Can add/edit menu items
   - [ ] Can see incoming orders
   - [ ] Real-time notifications work
   - [ ] Can update order status

3. **Mobile Testing:**
   - [ ] Test on actual smartphones
   - [ ] Check QR code scanning
   - [ ] Verify touch interactions

---

## 💰 Cost Breakdown (All FREE!)

### Render Free Tier:
- ✅ 750 hours/month (enough for your event)
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Auto-deploys from GitHub

### Railway Free Tier:
- ✅ $5 credit/month (plenty for small apps)
- ✅ Easy scaling if needed

### Vercel Free Tier:
- ✅ Unlimited static deployments
- ✅ Global CDN
- ✅ Custom domains

---

## 🔥 Pro Tips

### For Your Event:
1. **Test 2-3 days before** the event
2. **Print QR codes** from the generated HTML file
3. **Share admin URL** with staff: `your-url.com/admin`
4. **Have backup plan**: Keep a phone with the admin panel open

### Performance:
- Free tiers might "sleep" after 30min of inactivity
- First request after sleep takes ~30 seconds to wake up
- For events, visit the site every 20 minutes to keep it awake

### Custom Domain (Optional):
- Most free platforms support custom domains
- Buy domain from Namecheap (~$10/year)
- Point to your deployment platform

---

## 🆘 Troubleshooting

### Common Issues:

**"App sleeping" on free tier:**
- Visit the site every 20 minutes
- Use a uptime monitoring service (also free)

**QR code not working:**
- Double-check the URL in `qr-generator.js`
- Test the URL manually in browser first

**API not connecting:**
- Check CORS settings in `server/index.js`
- Verify environment variables are set

**Build fails:**
- Check all dependencies are in `package.json`
- Ensure Node.js version compatibility

---

## 🎉 Ready for Your Event!

Once deployed, you'll have:
- ✅ Professional ordering system
- ✅ Real-time order management  
- ✅ Mobile-optimized interface
- ✅ Automatic order numbering
- ✅ Beautiful QR codes to print

**Total cost: $0** 💰

Your customers will be impressed with the modern, contactless ordering experience!
