# 🎮 Game Store

A simple Node.js app to display game products, descriptions, prices, genres, platforms, and more!

![Game Store Demo](./demo2.gif)

## 🗂 Project Structure

```
game-store/
├── dev-data/
│   └── data.json             # game data (title, genre, price, description, etc.)
├── modules/
│   └── replaceTemplate.js    # HTML template placeholder replacer
├── styles/
│   └── style.css             # main CSS file
├── templates/
│   ├── template-card.html    # HTML template for each game card
│   └── template-overview.html # main overview page
├── index.js                  # main server file
├── package.json
└── README.md
```


## 🗂 Sample Data (data.json)

```json
[
   {
      "id": 0,
      "title": "Elden Ring",
      "genre": "Action RPG",
      "price": "59.99",
      "platform": "PC, PS5, Xbox",
      "rating": "9.5",
      "image": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
      "description": "An epic open-world fantasy game developed by FromSoftware.",
      "inStock": true
    },
    {
      "id": 1,
      "title": "Animal Crossing",
      "genre": "Simulation",
      "price": "49.99",
      "platform": "Nintendo Switch",
      "rating": "9.0",
      "image": "https://media.rawg.io/media/games/9dc/9dc9fbd2c2054a3a9b7c33a906546bea.jpg",
      "description": "Build your island life with adorable animal villagers.",
      "inStock": false
    },
  ]
```

## 🧩 Template Placeholders

These placeholders are used in the HTML templates:

```{%TITLE%}, {%GENRE%}, {%PRICE%}, {%PLATFORM%}, {%IMAGE%}, {%DESCRIPTION%}, {%ID%}, {%RATING%}, {%NOT_AVAILABLE%}```

## 🔀 Pages
	•	/overview – Main page with game cards
	•	/api – Returns raw JSON data

## ✨ Features

✅ Game cover image from RAWG

✅ Expanded layout with “See more” button toggle

✅ Styled Metascore system with emoji support

✅ In-stock badge based on availability


## 💡 Bonus Ideas
	•	Add filtering or sorting (by genre, platform, rating, etc.)
	•	Add a mock cart or wishlist
	•	Implement live RAWG API fetching for dynamic data
	•	Use slugs for clean URLs like /product/elden-ring
