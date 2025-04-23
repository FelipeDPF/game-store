const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
// const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////// FILES //////////////////////////////
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Optional: create slugs from product titles
// const slugs = dataObj.map(el => slugify(el.title, { lower: true }));
// console.log(slugs);

//////////////////////// SERVER //////////////////////////////
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Serve static CSS files
if (pathname.startsWith('/styles/')) {
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

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map(el => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});