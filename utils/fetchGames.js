/**
 * fetchGames.js
 *
 * This utility fetches a static list of games from the RAWG API using a fixed query.
 * It parses the response and maps relevant fields into a simplified game object format
 * used by the Game Store app.
 */

require('dotenv').config();
const https = require('https');

function fetchGamesFromRAWG(callback) {
  const apiKey = process.env.RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?page_size=6&key=${apiKey}`;

  https
    .get(url, (res) => {
      let data = '';

      // Stream incoming data chunks
      res.on('data', (chunk) => (data += chunk));

      // On end, parse and transform game data
      res.on('end', () => {
        const parsed = JSON.parse(data).results.map((game) => ({
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

        callback(parsed);
      });
    })
    .on('error', (err) => {
      console.error('Error fetching RAWG games:', err);
      callback([]); // Fallback to empty array on failure
    });
}

module.exports = fetchGamesFromRAWG;
