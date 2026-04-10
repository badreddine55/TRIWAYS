# TRIWAYS - Hostinger Deployment Guide

## Folder Structure
```
wordpress-complete/
├── index.php                 # Main entry point - routes all requests to React app
├── index.html                # Built React application
├── wp-config.php             # WordPress configuration (minimal)
├── wp-login.php              # WordPress login entry point
├── .htaccess                 # URL rewriting for React Router
├── assets/                   # All static assets (images, CSS, JS, logos)
│   ├── css/                  # Built Tailwind CSS files
│   ├── js/                   # Built React components and chunks
│   ├── logoC[0-18].png       # 19 partner logos
│   └── [other images]        # All other project images
├── wp-admin/                 # WordPress admin files
│   └── index.php             # Placeholder
├── wp-content/               # WordPress content directory
│   └── index.php             # Placeholder
└── wp-includes/              # WordPress includes directory
    └── index.php             # Placeholder
```

## How It Works
1. **index.php** receives all requests (via .htaccess rewrite rules)
2. **index.php** checks if the requested file exists (CSS, JS, images)
3. If file exists, it's served directly
4. If file doesn't exist, **index.html** (React app) is served
5. React Router handles client-side navigation

## Deployment Steps for Hostinger

### Step 1: Upload to Hostinger
1. Download `wordpress-complete.zip` file
2. Log in to Hostinger cPanel
3. Go to File Manager → public_html folder
4. Upload the ZIP file
5. Extract it (right-click → Extract)
6. Move all contents from wordpress-complete to public_html root (if needed)

### Step 2: Configure Database (Optional - Not Required for React)
- The **wp-config.php** is minimal and doesn't require an actual database
- WordPress folders are included for compatibility only
- Your React site works without WordPress database

### Step 3: Configure Domain
1. Go to Domains in cPanel
2. Point your domain to public_html
3. Wait for DNS propagation (15 minutes - 24 hours)

### Step 4: Verify Installation
1. Visit `https://yourdomain.com` in browser
2. You should see the TRIWAYS React application
3. Check Console (F12) for any errors
4. Test all pages and contact form

## Important Notes

### Email Configuration
- The contact form uses **mailto:sales@triwayslogistics.ma**
- It opens the user's email client with pre-filled data
- No backend server required
- Make sure the email address is correct in Contact.tsx

### Asset Paths
- All images and assets use `/assets/` path
- The public/ folder files are automatically served
- No relative path issues in production

### URL Rewriting
- **.htaccess** handles all routing to React Router
- Enables pretty URLs without hash (#)
- Requires mod_rewrite enabled on Hostinger (usually enabled by default)

### SSL/HTTPS
- Hostinger provides free SSL certificate
- Enable it in cPanel → SSL/TLS Status
- Force HTTPS in your domain settings

## Troubleshooting

### White screen or 404 errors
1. Verify .htaccess file exists in public_html
2. Check that index.php and index.html are in root
3. Check browser console (F12) for specific errors

### Images not loading
1. Verify assets/ folder exists in public_html
2. Check image paths in browser Network tab (F12)
3. Clear browser cache (Ctrl+Shift+Del)

### Contact form not working
1. Ensure you have an email client configured (Gmail, Outlook, etc.)
2. Check that sales@triwayslogistics.ma is correct
3. Update email address if needed in src/pages/Contact.tsx

### Performance issues
1. Clear Hostinger caching
2. Check file sizes in assets/ folder
3. Consider Cloudflare integration for CDN

## Support
For Hostinger support: https://www.hostinger.com/support
For React/Technical issues: Check browser console logs (F12)

---
**TRIWAYS Logistics**  
Deploy Date: 2024  
Website: TRIWAYS - International Logistics Solutions
