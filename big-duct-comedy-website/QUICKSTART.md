# 🚀 Quick Start Guide - Big Duct Comedy

Get your comedy website online in under 10 minutes!

---

## ⚡ Fastest Path to Live Site

### Option 1: Cloudflare Pages (Recommended - 5-10 minutes)

1. **Create GitHub Repository**
   ```bash
   cd "f:\big duct site\big-duct-comedy-website"
   git init
   git add .
   git commit -m "Initial commit - Big Duct Comedy"
   ```

2. **Push to GitHub**
   - Go to [GitHub.com](https://github.com/new)
   - Create a new repository named `big-duct-comedy`
   - Run these commands:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/big-duct-comedy.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Cloudflare**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click "Workers & Pages" → "Create application" → "Pages"
   - Click "Connect to Git" and select your repository
   - Configure:
     - **Project name:** `big-duct-comedy`
     - **Production branch:** `main`
     - **Build command:** `npm run build`
     - **Build output:** `.vinext/output`
   - Click "Save and Deploy"

4. **Done!** 🎉
   Your site will be live at: `https://big-duct-comedy.pages.dev`

---

## 🎯 Before You Launch - Quick Checklist

### Update These Files

1. **Update Site URL in metadata** (once you have your domain)
   
   Edit `app/layout.tsx`:
   ```tsx
   // Change this URL to your actual domain
   url: "https://bigductcomedy.com",
   ```

2. **Add Your Domain** (optional but recommended)
   - In Cloudflare Pages, go to: Custom domains → Add domain
   - Enter: `bigductcomedy.com`
   - Follow DNS instructions
   - Wait 5-30 minutes for DNS propagation

3. **Update Sitemap** (after getting domain)
   
   Edit `app/sitemap.ts`:
   ```tsx
   const baseUrl = 'https://YOUR-DOMAIN.com' // Update this!
   ```

---

## 🧪 Test Locally First

Before deploying, test everything works:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to:
# http://localhost:5173
```

Check:
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] "Real-World Alerts" page works
- [ ] Episode page loads
- [ ] Mobile view looks good (resize browser)

---

## 🎨 Quick Customizations

### Add Your Own Episodes

1. Add images to `/public` folder
2. Edit `app/page.tsx` and add to `episodes` array:

```tsx
const episodes = [
  {
    number: "004",
    title: "Your New Episode",
    image: "/comic-your-new-episode.png",
    alt: "Description of your comic",
    color: "blue", // or "orange"
  },
  // ... existing episodes
];
```

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --ink: #172033;      /* Dark text color */
  --paper: #fffdf6;    /* Background */
  --blue: #0867e8;     /* Primary blue */
  --orange: #ff6b19;   /* Accent orange */
  --yellow: #ffd624;   /* Highlight yellow */
  --red: #d82222;      /* Alert red */
}
```

### Update Branding

Replace these files in `/public`:
- `big-duct-logo.png` - Your logo (352x116px recommended)
- `favicon.svg` - Your favicon

---

## 📱 Sharing on Social Media

Your site is already optimized for sharing! When you share links:
- Twitter/X will show a large card with image
- Facebook will show rich preview
- LinkedIn will show professional preview

Test how it looks: [OpenGraph Preview](https://www.opengraph.xyz/)

---

## 🆘 Troubleshooting

### Build Fails on Cloudflare
**Error:** "Build failed"
- Check Node version is set to 22 or higher in build settings
- Try running `npm run build` locally first to catch errors

### Images Not Loading
- Ensure images are in `/public` folder
- Check paths start with `/` (e.g., `/logo.png` not `logo.png`)
- Verify image file names match exactly (case-sensitive)

### Alerts Page Shows Error
- This is normal if NWS/USGS APIs are temporarily down
- The error page will guide users to official sources
- Page automatically retries when refreshed

### Site Looks Broken on Mobile
- Clear browser cache
- Try in incognito/private window
- Check browser console for errors (F12)

---

## 🎯 Next Steps After Launch

### Day 1
- [ ] Share on your personal social media
- [ ] Post in relevant Reddit communities (r/webdev, r/comedy)
- [ ] Submit to search engines manually:
  - [Google Search Console](https://search.google.com/search-console)
  - [Bing Webmaster](https://www.bing.com/webmasters)

### Week 1
- [ ] Add Google Analytics or Plausible
- [ ] Create 2-3 more episodes
- [ ] Set up social media accounts (@bigductcomedy)
- [ ] Create email newsletter signup

### Month 1
- [ ] Review analytics (what's popular?)
- [ ] Get feedback from users
- [ ] Create episode archive page
- [ ] Add RSS feed for subscribers

---

## 💡 Content Tips

### Episode Ideas That Work
1. **Relatable disasters** - Everyone has contractor horror stories
2. **Unexpected solutions** - "When the duct tape IS the solution"
3. **Customer misunderstandings** - Comedy gold
4. **Tool mishaps** - Physical comedy translates well
5. **Seasonal themes** - Winter heating emergencies, summer AC fails

### Posting Schedule
- Start with **1 episode per week** (sustainable)
- Post consistently (same day/time)
- Build buffer of 4-5 episodes ahead
- Scale up to daily when you have rhythm

### Marketing
- Use hashtags: #BlueCollarComedy #HVAC #PlumbingHumor
- Tag relevant accounts
- Engage with comments
- Cross-post to TikTok, Instagram Reels
- Create meme versions of panels

---

## 🔗 Useful Links

**Your Site** (update after deploy)
- Live site: `https://big-duct-comedy.pages.dev`
- Cloudflare Dashboard: [dash.cloudflare.com](https://dash.cloudflare.com/)

**Documentation**
- See `DEPLOYMENT.md` for detailed hosting guides
- See `IMPROVEMENTS.md` for future feature ideas
- See `README.md` for technical details

**Tools**
- [PageSpeed Insights](https://pagespeed.web.dev/) - Test performance
- [OpenGraph Preview](https://www.opengraph.xyz/) - Test social cards
- [Favicon Generator](https://realfavicongenerator.net/) - Create favicons

---

## 🎉 You're Ready!

Your site is professional, fast, and ready for traffic. Now:

1. **Deploy** using the steps above
2. **Share** with your network
3. **Create** more great content
4. **Iterate** based on feedback

Remember: Starting is better than perfect. Launch now, improve later!

Got questions? Check the documentation or issues page.

**Good luck with Big Duct Comedy! 🚀🔧**
