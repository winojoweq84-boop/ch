# CarVault Static HTML Site

This is a pure static HTML version of the CarVault website, converted from the original Next.js application. It includes no animations, no JavaScript frameworks, and is optimized for static hosting.

## Features

- **Pure HTML/CSS/JS**: No frameworks, no build process required
- **Responsive Design**: Works on all devices from iPhone 16 to desktop
- **No Animations**: Static version as requested
- **SEO Optimized**: Complete meta tags, sitemap, and robots.txt
- **Form Functionality**: Working contact and valuation forms
- **Sticky Video**: Desktop-only sticky video player
- **Mobile Menu**: Vanilla JavaScript mobile navigation

## File Structure

```
static-html/
├── index.html              # Homepage
├── how-it-works.html       # How it works page
├── pricing.html            # Pricing page
├── about.html              # About us page
├── contact.html            # Contact page
├── thank-you.html          # Thank you page
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots file
└── assets/
    ├── css/
    │   └── styles.css      # All styles (no animations)
    ├── js/
    │   └── main.js         # Vanilla JavaScript functionality
    ├── img/                # All images and icons
    └── videos/             # Video assets
```

## Deployment

This static site can be deployed to any static hosting service:

- **GitHub Pages**: Upload the entire `static-html` folder
- **Netlify**: Drag and drop the folder
- **Vercel**: Deploy as static site
- **AWS S3**: Upload files to S3 bucket
- **Any web server**: Copy files to web root

## Local Preview (Static HTML)

1. `npm install`
2. `npm run preview:html`
3. Open http://localhost:5173/

## Testing

To test locally:

1. Navigate to the `static-html` directory
2. Start a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   # or
   php -S localhost:8000
   ```
3. Open http://localhost:8000 in your browser

## Key Differences from Next.js Version

- **No Animations**: All Framer Motion animations removed
- **Static Forms**: Forms redirect to thank-you page (no backend)
- **Vanilla JS**: All interactions use plain JavaScript
- **No Build Process**: Direct HTML/CSS/JS files
- **Simplified Navigation**: Basic anchor links instead of Next.js routing

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support
- IE11: Not supported (uses modern CSS features)

## Performance

- **Fast Loading**: No JavaScript frameworks to download
- **Small Bundle**: Minimal CSS and JS
- **Optimized Images**: All images properly sized
- **SEO Ready**: Complete meta tags and structured data

## Maintenance

To update the site:

1. Edit HTML files directly
2. Modify CSS in `assets/css/styles.css`
3. Update JavaScript in `assets/js/main.js`
4. Replace images in `assets/img/`
5. No build process required - changes are immediate

## Contact

For questions about this static version, contact the development team.
