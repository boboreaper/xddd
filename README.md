# xddd - Dynamic Website with WebGL Animations

A dynamic portfolio website featuring WebGL animations, smooth page transitions, and immersive interactive experiences.

## Features

- **WebGL Animations** - Interactive visual effects using WebGL canvas
- **Smooth Page Transitions** - Seamless navigation between pages
- **Dynamic Loading** - Progressive loading animation with texture streaming
- **Responsive Design** - Optimized for both desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/boboreaper/xddd.git
cd xddd
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the Express server:
```bash
npm start
```

Or directly with Node:
```bash
node server.js
```

The server will start on `http://localhost:3000`

Open your browser and navigate to:
- Homepage: `http://localhost:3000`
- About page: `http://localhost:3000/about`

## How It Works

The website uses a dynamic Express.js server that:

1. **Serves Static Assets** - CSS, JavaScript, images, and fonts from `/static` directory
2. **Dynamic JSON API** - Responds to requests with `?webp=true&device=d` query params, returning:
   - `body` - HTML app shell
   - `cache` - Pre-cached page HTML for all routes
   - `routes` - Route configuration mapping
   - `data` - Texture paths for WebGL rendering

3. **Client-Side Rendering** - The JavaScript (`d.js`) handles:
   - WebGL texture loading and rendering
   - Page transitions and animations
   - Client-side routing

## Project Structure

```
xddd/
├── server.js              # Express server
├── package.json           # Dependencies
├── index.html             # Main HTML template
├── index-data.json        # Homepage data and routes
├── about-data.json        # About page data
└── static/
    ├── js/
    │   └── d.js          # Main JavaScript application
    ├── css/
    │   └── d.css         # Desktop styles
    ├── media/
    │   └── d/
    │       ├── load/     # Loading screen textures (25 images)
    │       └── work/     # Project thumbnails (8 images)
    ├── font/             # Custom fonts
    └── fav/              # Favicons
```

## Development

The server includes in-memory caching for JSON data files to improve performance. Changes to `*-data.json` files require a server restart to take effect.

## License

This project is for portfolio purposes.
