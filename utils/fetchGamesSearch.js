/**
 * fetchGamesSearch.js
 *
 * This module fetches a list of video games from the RAWG API based on a search query.
 * The results are parsed and mapped into simplified game objects used for rendering.
 */

require('dotenv').config();
const https = require('https');

function fetchGamesFromRAWGSearch(query, page = 1, callback) {
  // RAWG API credentials and URL
  const apiKey = process.env.RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(
    query
  )}&page=${page}&page_size=6&key=${apiKey}`;

  https
    .get(url, (res) => {
      let data = '';

      // Gather incoming data
      res.on('data', (chunk) => (data += chunk));

      // When finished receiving data
      res.on('end', () => {
        const raw = JSON.parse(data);

        if (!raw.results) {
          callback([], 0);
          return;
        }

        // Parse and map results into simplified game objects
        const parsed = raw.results.map((game) => ({
          title: game.name,
          genre: game.genres?.[0]?.name || 'Unknown',
          platform:
            game.parent_platforms?.map((p) => p.platform.name).join(', ') ||
            'Unknown',
          price: 'N/A', // Still placeholder unless you mock it
          metacritic: game.metacritic,
          image: game.background_image,
          released: game.released,
          playtime: game.playtime,
          ratingsCount: game.ratings_count,
          trailer: game.clip?.clip, // null-safe trailer
          description: game.description_raw || 'No description available',
          inStock: Math.random() < 0.5, // Random in-stock flag for mock/demo
          id: game.id,
        }));

        callback(parsed, raw.count || 0); // return total count too
      });
    })
    .on('error', (err) => {
      console.error('Error fetching RAWG search games:', err);
      callback([], 0);
    });
}

module.exports = fetchGamesFromRAWGSearch;
