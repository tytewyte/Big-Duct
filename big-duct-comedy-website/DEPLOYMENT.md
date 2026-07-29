# 🚀 Deploying Big Duct Comedy

This guide covers multiple hosting options for your Big Duct Comedy website.

## Table of Contents
1. [Cloudflare Pages (Recommended)](#cloudflare-pages)
2. [Vercel](#vercel)
3. [Netlify](#netlify)
4. [Self-Hosting on VPS](#self-hosting-vps)

---

## 🎯 Cloudflare Pages (Recommended)

**Best for:** This project (already configured for Cloudflare Workers)  
**Cost:** Free tier available (unlimited bandwidth, 500 builds/month)

### Prerequisites
- GitHub account (or GitLab/Bitbucket)
- Cloudflare account (free)

### Steps

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/big-duct-comedy.git
   git push -u origin main
   ```

2. **Create Cloudflare Pages Project**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "Workers & Pages"
   - Click "Create application" → "Pages" → "Connect to Git"
   - Select your repository
   - Configure build settings:
     - **Framework preset:** Next.js
     - **Build command:** `npm run build`
     - **Build output directory:** `.vinext/output`
     - **Node version:** 22.13.0 or higher

3. **Environment Variables** (if needed)
   - Add any environment variables in the Pages settings
   - See `.env.example` for reference

4. **Custom Domain** (optional)
   - Go to your Pages project → Custom domains
   - Add your domain (e.g., `bigductcomedy.com`)
   - Update your DNS records as instructed

5. **Deploy**
   - Push to your main branch
   - Cloudflare Pages automatically builds and deploys
   - Get your URL: `https://big-duct-comedy.pages.dev`

### Benefits
- ✅ Zero configuration (already set up)
- ✅ Automatic deployments on git push
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Edge computing with Workers
- ✅ Built-in D1 database support

---

## ⚡ Vercel

**Best for:** Easy Next.js deployment  
**Cost:** Free tier available (100GB bandwidth/month)

### Steps

1. **Push code to GitHub** (same as above)

2. **Import Project in Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework:** Next.js
     - **Build command:** `npm run build`
     - **Output directory:** `.next`
     - **Install command:** `npm install`

3. **Update Configuration**
   
   You need to modify `package.json` for standard Next.js:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start"
     }
   }
   ```

4. **Deploy**
   - Click "Deploy"
   - Get your URL: `https://big-duct-comedy.vercel.app`

### Note
This project uses Cloudflare Workers (vinext), so some adjustments are needed for Vercel. Consider staying with Cloudflare Pages for easier deployment.

---

## 📦 Netlify

**Best for:** Simple static/JAMstack sites  
**Cost:** Free tier available (100GB bandwidth/month)

### Steps

1. **Push code to GitHub**

2. **Import Project in Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure:
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`
     - **Node version:** 22.13.0

3. **Deploy**
   - Click "Deploy site"
   - Get your URL: `https://big-duct-comedy.netlify.app`

### Note
Similar to Vercel, this requires modifications since the project uses Cloudflare infrastructure.

---

## 🖥️ Self-Hosting on VPS

**Best for:** Full control, learning experience  
**Cost:** $5-10/month (DigitalOcean, Linode, Vultr, Hetzner)

### Prerequisites
- VPS with Ubuntu 22.04+ (1GB RAM minimum)
- Domain name (optional)
- SSH access

### Steps

1. **Set up VPS**
   ```bash
   # Connect to your VPS
   ssh root@your-server-ip

   # Update system
   apt update && apt upgrade -y

   # Install Node.js 22
   curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
   apt install -y nodejs

   # Install PM2 (process manager)
   npm install -g pm2

   # Install Nginx (reverse proxy)
   apt install -y nginx

   # Install Certbot (SSL certificates)
   apt install -y certbot python3-certbot-nginx
   ```

2. **Clone Your Repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/big-duct-comedy.git
   cd big-duct-comedy

   # Install dependencies
   npm ci

   # Build the project
   npm run build
   ```

3. **Configure PM2**
   ```bash
   # Start the app with PM2
   pm2 start npm --name "big-duct-comedy" -- start

   # Save PM2 config
   pm2 save

   # Set PM2 to start on boot
   pm2 startup
   ```

4. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/bigductcomedy
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name bigductcomedy.com www.bigductcomedy.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   ln -s /etc/nginx/sites-available/bigductcomedy /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

5. **Set up SSL (HTTPS)**
   ```bash
   certbot --nginx -d bigductcomedy.com -d www.bigductcomedy.com
   ```

6. **Configure Firewall**
   ```bash
   ufw allow 'Nginx Full'
   ufw allow OpenSSH
   ufw enable
   ```

7. **Set up Auto-Deploy** (optional)
   ```bash
   # Create deploy script
   nano /var/www/big-duct-comedy/deploy.sh
   ```

   Add:
   ```bash
   #!/bin/bash
   cd /var/www/big-duct-comedy
   git pull origin main
   npm ci
   npm run build
   pm2 restart big-duct-comedy
   ```

   Make executable:
   ```bash
   chmod +x deploy.sh
   ```

### Benefits
- ✅ Complete control
- ✅ Can run other services on same server
- ✅ Learn server administration
- ✅ No vendor lock-in

### Drawbacks
- ❌ Manual security updates
- ❌ No automatic scaling
- ❌ You manage everything
- ❌ Requires technical knowledge

---

## 📊 Comparison Table

| Feature | Cloudflare Pages | Vercel | Netlify | Self-Hosted VPS |
|---------|-----------------|---------|---------|-----------------|
| **Setup Time** | 10 minutes | 10 minutes | 10 minutes | 1-2 hours |
| **Cost (Free Tier)** | Unlimited bandwidth | 100GB/month | 100GB/month | None (paid) |
| **Auto Deploy** | ✅ | ✅ | ✅ | Manual/scripted |
| **SSL** | ✅ Free | ✅ Free | ✅ Free | ✅ Free (Certbot) |
| **CDN** | ✅ Global | ✅ Global | ✅ Global | ❌ (unless configured) |
| **Database** | ✅ D1 (free) | ✅ Postgres (addon) | ❌ | ✅ Any database |
| **Difficulty** | ⭐ Easy | ⭐ Easy | ⭐ Easy | ⭐⭐⭐ Advanced |
| **Best For** | This project | Standard Next.js | Static sites | Learning/control |

---

## 🎯 Recommendation

**For Big Duct Comedy: Use Cloudflare Pages**

Why?
1. Already configured for Cloudflare Workers
2. Zero configuration needed
3. Best performance with edge computing
4. Free D1 database ready to use
5. Unlimited bandwidth on free tier
6. Automatic deployments

---

## 🔧 Troubleshooting

### Build fails
- Check Node.js version is 22.13.0+
- Run `npm ci` to ensure clean install
- Check build logs for specific errors

### Images not loading
- Verify images are in `/public` directory
- Check image paths start with `/` (e.g., `/logo.png`)

### API timeout errors
- Increase timeout in API calls (currently 4500ms)
- Add retry logic for external APIs

### Domain not working
- Check DNS propagation (can take 24-48 hours)
- Verify CNAME/A records point to hosting provider
- Clear browser cache

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Next.js Docs](https://vercel.com/docs/frameworks/nextjs)
- [Netlify Docs](https://docs.netlify.com/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)

---

## 🆘 Need Help?

If you run into issues:
1. Check the hosting provider's status page
2. Review build logs carefully
3. Search for error messages in the provider's community forum
4. Check this project's GitHub issues

Good luck with your deployment! 🚀
