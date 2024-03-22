
# Summary
This Express app utilizes Puppeteer, a Node.js library, to crawl web pages.
It serves as a web crawler that fetches and analyzes the content of web pages.
The app exposes endpoints through an Express server, allowing clients to request specific URLs to crawl.
With Puppeteer, the app launches a headless Chrome browser, navigates to the requested URL, and extracts relevant data once the page is loaded.

# Scripts
- `npm start` Starts the development server with nodemon.
- `npm run build`
- `npm run typegen`  Generates schema typescript files.
