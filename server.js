const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// Cache for page data to avoid repeated file reads
const pageDataCache = {};

// Serve static files from /static directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// Helper function to load JSON data (with caching)
function loadPageData(pageName) {
    if (pageDataCache[pageName]) {
        return pageDataCache[pageName];
    }
    
    const filePath = path.join(__dirname, `${pageName}-data.json`);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        pageDataCache[pageName] = data;
        return data;
    }
    return null;
}

// Helper function to determine page data file from URL
function getPageDataFile(urlPath) {
    if (urlPath === '/about' || urlPath === '/about.html') {
        return 'about';
    }
    return 'index';
}

// Helper function to handle JSON data requests
function handleDataRequest(req, res) {
    const { webp, device } = req.query;
    
    if (webp && device) {
        const pageDataFile = getPageDataFile(req.path);
        const pageData = loadPageData(pageDataFile);
        
        if (pageData) {
            res.json(pageData);
        } else {
            res.status(404).json({ error: 'Page data not found' });
        }
    } else {
        res.status(400).json({ error: 'Missing required query parameters: webp and device' });
    }
}

// Main route handler for dynamic content
app.get('*', (req, res) => {
    const { webp, device } = req.query;
    
    // Check if this is a dynamic JSON request
    if (webp && device) {
        handleDataRequest(req, res);
    } else {
        // Normal HTML request - serve index.html
        const htmlFile = path.join(__dirname, 'index.html');
        res.sendFile(htmlFile);
    }
});

// Handle POST requests (d.js uses POST for JSON fetches)
app.post('*', handleDataRequest);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open http://localhost:3000 to view the site');
});
