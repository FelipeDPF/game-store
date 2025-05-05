# 🎮 Game Store

A Node.js app to display game products, descriptions, prices, genres, platforms, and more!

![Game Store Demo](./demo3.gif)

## 🗂 Project Structure

```
game-store/
├── modules/
│   └── replaceTemplate.js       # HTML template placeholder replacer
├── public/
│   └── styles/
│       └── style.css            # Main CSS file
├── templates/
│   ├── template-card.html       # HTML template for each game card
│   └── template-overview.html   # Main overview page
├── utils/
│   ├── fetchGames.js            # Static RAWG API fetch utility
│   └── fetchGamesSearch.js      # Dynamic RAWG search API utility
├── .env                         # Environment file with RAWG_API_KEY (excluded from Git)
├── .gitignore                   # Git ignore config
├── index.js                     # Main server file
├── package.json
└── README.md
```


## 🗂 Sample Data (data.json)
- Note: The `data.json` file has been removed in v1.2.0-beta01. Game data is now fetched dynamically from the RAWG API.

## 🧩 Template Placeholders

These placeholders are used in the HTML templates:

```{%GAMENAME%}, {%IMAGE%}, {%PRICE%}, {%PRICE%}, {%PLATFORM%}, {%GENRE%}, {%METACRITIC%}, {%RELEASE%}, {%PLAYTIME%}, {%RATINGSCOUNT%}, {%TRAILER%}, {%DESCRIPTION%}, {%ID%}, {%NOT_AVAILABLE%}```

## 🔀 Pages
- /overview – Main page with game cards
- /api – Returns raw JSON data
- /search?query=xxx – Search games using RAWG API

## ✨ Features

- ✅ Game cover image from RAWG API
- ✅ Expanded layout with “See more” button toggle
- ✅ Styled Metascore system with color-coded labels
- ✅ In-stock badge based on availability
- ✅ Dynamic game fetching using RAWG search API
- ✅ Game platform icons instead of plain text
- ✅ Updated title/header layout and global UI styling
- ✅ Pagination support with active/disabled styling


## 💡 Bonus Ideas
- 🔄 Add filtering or sorting (by genre, platform, rating, etc.)
-	❤️ Add a mock cart or wishlist
-	🔍 Use slugs for clean URLs like /product/elden-ring
-	💾 Cache API results for faster load and fewer API calls

## 🚀 Version

### v1.2.0-beta01
- Added RAWG static and search fetch utilities (`fetchGames.js`, `fetchGamesSearch.js`)
- Refactored API key management using dotenv (`.env`)
- Implemented platform icons for a more intuitive UI
- Improved Metascore badge system with styling and logic
- Added search input field to overview layout
- Updated title, header, and card layout styling
- General code cleanup: indentation and formatting