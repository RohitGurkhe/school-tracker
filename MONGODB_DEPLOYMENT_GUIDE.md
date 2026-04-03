# 🚀 DEPLOYMENT GUIDE - Full Stack with MongoDB

## 📋 WHAT WE HAVE

1. **Backend** (Node.js + MongoDB)
   - server.js
   - package.json
   - .env

2. **Frontend** (HTML + JavaScript)
   - index-mongodb.html
   - WhatsApp_Image_2026-04-03_at_9_55_37_AM.jpeg

---

## 🔧 STEP 1: Deploy Backend to Heroku (FREE)

### Option A: Using Heroku (Recommended - FREE)

**Step 1: Prepare Backend Files**

```
backend/
├── server.js
├── package.json
├── .env
└── .gitignore
```

**Create .gitignore file:**
```
node_modules/
.env
```

**Step 2: Install Heroku CLI**
- Go to: https://devcenter.heroku.com/articles/heroku-cli
- Download and install

**Step 3: Login to Heroku**
```bash
heroku login
```

**Step 4: Create Heroku App**
```bash
heroku create your-app-name
```

**Step 5: Set Environment Variables**
```bash
heroku config:set MONGODB_URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/10thm1tracker"
```

**Step 6: Deploy**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

**Your backend URL:**
```
https://your-app-name.herokuapp.com
```

---

### Option B: Using Railway (Easier)

**Step 1: Go to https://railway.app**

**Step 2: Connect GitHub**
- Sign up with GitHub
- Click "New Project"
- Select "Deploy from GitHub"

**Step 3: Upload Files**
- Create GitHub repo with your backend files
- Connect repo to Railway

**Step 4: Add Environment**
- Add MONGODB_URI in Railway dashboard
- Railway auto-deploys!

**Your backend URL:**
```
https://your-project.railway.app
```

---

### Option C: Using Render (Very Easy)

**Step 1: Go to https://render.com**

**Step 2: Sign Up & Create**
- New "Web Service"
- Connect GitHub repo

**Step 3: Configure**
- Build command: `npm install`
- Start command: `node server.js`
- Add env variable: MONGODB_URI

**Deploy!** ✅

**Your backend URL:**
```
https://your-service.onrender.com
```

---

## 📝 STEP 2: Update Frontend with Backend URL

**In index-mongodb.html, find line ~398:**

```javascript
const API_URL = 'https://your-backend-url.herokuapp.com';
```

**Change to your actual backend URL:**

```javascript
// Example for Heroku:
const API_URL = 'https://my-tracker-backend.herokuapp.com';

// Example for Railway:
const API_URL = 'https://my-tracker.railway.app';

// Example for Render:
const API_URL = 'https://my-tracker-backend.onrender.com';
```

---

## 🌐 STEP 3: Deploy Frontend to Netlify

**Step 1: Prepare Files**
```
frontend/
├── index-mongodb.html (renamed to index.html)
└── WhatsApp_Image_2026-04-03_at_9_55_37_AM.jpeg
```

**Step 2: Rename File**
- Rename `index-mongodb.html` to `index.html`

**Step 3: Upload to Netlify**
- Go to https://netlify.com
- Drag & drop folder
- Done! ✅

**Your frontend URL:**
```
https://something.netlify.app
```

---

## ✅ FINAL RESULT

### Backend Running On:
```
Heroku / Railway / Render
https://your-backend-url.com/api/contributions
https://your-backend-url.com/api/expenses
```

### Frontend Running On:
```
Netlify
https://your-frontend.netlify.app
```

### Database:
```
MongoDB Atlas (Free)
mongodb+srv://username:password@cluster.mongodb.net/10thm1tracker
```

---

## 🎯 REAL-TIME SYNC FEATURES

✅ **All friends see SAME data**
✅ **Updates appear instantly** (auto-refresh every 5 seconds)
✅ **Multiple people can add data simultaneously**
✅ **Data persists in MongoDB** (not lost on refresh)
✅ **100% Free deployment**
✅ **Mobile friendly**

---

## 🧪 TEST IT

1. **Open frontend URL** on your phone
2. **Add contribution:** "Priya - 500"
3. **Open frontend URL** in another browser/phone
4. **You see the SAME data!** ✅
5. **Add expense** from one device
6. **See update** in other device instantly!

---

## 📝 SETUP CHECKLIST

- [ ] MongoDB Atlas cluster created
- [ ] Connection string ready
- [ ] Backend files ready (server.js, package.json, .env)
- [ ] Backend deployed to Heroku/Railway/Render
- [ ] Frontend URL updated with backend URL
- [ ] Frontend deployed to Netlify
- [ ] Both files (HTML + image) in same folder
- [ ] Tested: Can add data
- [ ] Tested: Friends see same data
- [ ] Share link with classmates!

---

## 🚨 TROUBLESHOOTING

### Frontend says "Cannot connect to server"
- Check if backend URL is correct in code
- Make sure backend is running
- Restart backend server

### Data not appearing
- Check MongoDB connection string
- Make sure cluster is running
- Check MongoDB IP whitelist (allow all)

### Image not showing
- Make sure image file in same folder as HTML
- Rename HTML to `index.html`
- Reload browser

### Friends still not seeing same data
- Refresh browser (Ctrl+R)
- Check if both using same frontend URL
- Verify backend is running

---

## 📞 SUPPORT LINKS

- **Heroku Docs:** https://devcenter.heroku.com
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Netlify Docs:** https://docs.netlify.com

---

## 🎉 YOU'RE DONE!

Your expense tracker now:
✅ Syncs in REAL-TIME
✅ Works for unlimited friends
✅ Data stored safely in MongoDB
✅ Completely FREE
✅ Works on all devices

**Share the frontend URL with your class!**
Everyone will see the SAME expenses tracker! 🚀

