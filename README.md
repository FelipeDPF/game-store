### Display game products, descriptions, prices, genres, platforms, and more!
1. Project Structure

game-store/
├── dev-data/
│   └── data.json          ← game data (title, genre, price, description, etc.)
├── templates/
│   ├── template-card.html
│   ├── template-overview.html
│   └── template-product.html
├── modules/
│   └── replaceTemplate.js
├── index.js               ← main server file
├── package.json

2. Sample Data (data.json)

[
    {
      "id": 0,
      "title": "Elden Ring",
      "genre": "Action RPG",
      "price": "59.99",
      "platform": "PC, PS5, Xbox",
      "rating": "9.5",
      "image": "🛡️",
      "description": "An epic open-world fantasy game developed by FromSoftware."
    },
    {
      "id": 1,
      "title": "Animal Crossing",
      "genre": "Simulation",
      "price": "49.99",
      "platform": "Nintendo Switch",
      "rating": "9.0",
      "image": "🏝️",
      "description": "Build your island life with adorable animal villagers."
    }
  ]

3. Template Placeholders

In template-card.html, template-product.html, and template-overview.html, use placeholders like:

{%TITLE%}, {%GENRE%}, {%PRICE%}, {%PLATFORM%}, {%IMAGE%}, {%DESCRIPTION%}, {%ID%}

4. Pages
 • / or /overview → Show all games
 • /product?id=0 → Show detailed page for a specific game
 • /api → Return raw JSON
 • Custom 404 for unknown routes

5. Bonus Ideas
 • Add filtering or sorting options (by genre, platform, rating, etc.)
 • Add a mock shopping cart or wishlist
 • Include game cover images using actual emojis or URLs
 • Use slugify to create URL-friendly paths like /product/elden-ring