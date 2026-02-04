const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /static directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// Helper function to load JSON data
function loadPageData(pageName) {
    const filePath = path.join(__dirname, `${pageName}-data.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return null;
}

// Main route handler for dynamic content
app.get('*', (req, res) => {
    const { webp, device } = req.query;
    
    // Check if this is a dynamic JSON request
    if (webp && device) {
        // Determine which page data to load based on URL
        let pageDataFile = 'index';
        if (req.path === '/about' || req.path === '/about.html') {
            pageDataFile = 'about';
        }
        
        const pageData = loadPageData(pageDataFile);
        
        if (pageData) {
            // Return JSON response with body, cache, routes, and data
            res.json(pageData);
        } else {
            res.status(404).json({ error: 'Page not found' });
        }
    } else {
        // Normal HTML request - serve index.html
        const htmlFile = path.join(__dirname, 'index.html');
        res.sendFile(htmlFile);
    }
});

// Handle POST requests (d.js uses POST for JSON fetches)
app.post('*', (req, res) => {
    const { webp, device } = req.query;
    
    if (webp && device) {
        let pageDataFile = 'index';
        if (req.path === '/about' || req.path === '/about.html') {
            pageDataFile = 'about';
        }
        
        const pageData = loadPageData(pageDataFile);
        
        if (pageData) {
            res.json(pageData);
        } else {
            res.status(404).json({ error: 'Page not found' });
        }
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open http://localhost:3000 to view the site');
});
