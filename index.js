/**
 * index.js
 *
 * This is the entry point for the Game Store application.
 * It sets up a simple HTTP server using Node.js, reads HTML templates,
 * dynamically injects game data fetched from the RAWG API, and serves
 * static assets (CSS, images).
 */

const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const replaceTemplate = require('./modules/replaceTemplate');
const fetchGamesFromRAWG = require('./utils/fetchGames');
const fetchGamesFromRAWGSearch = require('./utils/fetchGamesSearch'); // <- handles dynamic search API

// Load HTML templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

// Optional: create slugs from product titles
// const slugs = dataObj.map(el => slugify(el.title, { lower: true }));
// console.log(slugs);

// Create server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Serve static CSS
  if (pathname.startsWith('/styles')) {
    const filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(404);
        res.end('CSS file not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(file);
      }
    });
    return;
  }

  // Serve static images
  if (pathname.startsWith('/icons')) {
    const filePath = path.join(__dirname, 'public', pathname);
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(404);
        res.end('Icon not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(file);
      }
    });
    return;
  }

  // Overview Page (static RAWG content)
  if (pathname === '/' || pathname === '/overview') {
    fetchGamesFromRAWG((games) => {
      const cardsHtml = games
        .map((el) => replaceTemplate(tempCard, el))
        .join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(output);
    });
    return;
  }

  // Search Page (dynamic RAWG search query)
  if (pathname === '/search') {
    const searchQuery = query.query;
    const page = parseInt(query.page) || 1;

    fetchGamesFromRAWGSearch(searchQuery, page, (games, totalCount) => {
      let output = '';

      if (games.length === 0) {
        output = tempOverview.replace(
          '{%PRODUCT_CARDS%}',
          `<div class="no-results">No results found for <strong>${searchQuery}</strong></div>`
        );
      } else {
        const cardsHtml = games
          .map((el) => replaceTemplate(tempCard, el))
          .join('');

        const totalPages = Math.ceil(totalCount / 6);
        const currentPage = page;
        const maxVisiblePages = 5;
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) end = Math.min(totalPages, maxVisiblePages);
        if (currentPage + half > totalPages)
          start = Math.max(1, totalPages - maxVisiblePages + 1);

        let paginationHtml = `<div class="pagination-container"><div class="pagination">`;

        // First + Prev
        if (currentPage > 1) {
          paginationHtml += `<a href="/search?query=${encodeURIComponent(
            searchQuery
          )}&page=1">«</a>`;
          paginationHtml += `<a href="/search?query=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage - 1}">‹</a>`;
        }

        // Ellipsis before range
        if (start > 1) paginationHtml += `<a class="disabled">...</a>`;

        // Page numbers
        for (let i = start; i <= end; i++) {
          paginationHtml += `<a href="/search?query=${encodeURIComponent(
            searchQuery
          )}&page=${i}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
        }

        // Ellipsis after range
        if (end < totalPages) paginationHtml += `<a class="disabled">...</a>`;

        // Next + Last
        if (currentPage < totalPages) {
          paginationHtml += `<a href="/search?query=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage + 1}">›</a>`;
          paginationHtml += `<a href="/search?query=${encodeURIComponent(
            searchQuery
          )}&page=${totalPages}">»</a>`;
        }

        paginationHtml += `</div></div>`;
        output = tempOverview.replace(
          '{%PRODUCT_CARDS%}',
          cardsHtml + paginationHtml
        );
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(output);
    });
    return;
  }

  // Fallback API endpoint placeholder
  if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API route under construction' }));
    return;
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>Page not found</h1>');
});

// Start server
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000...');
});
