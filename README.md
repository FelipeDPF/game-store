# 🎮 Game Store

A simple Node.js app to display game products, descriptions, prices, genres, platforms, and more!


## 🗂 Project Structure

```
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
```


## 📦 Sample Data (data.json)

```json
[
    {
      "id": 0,
      "title": "Elden Ring",
      "genre": "Action RPG",
      "price": "59.99",
      "platform": "PC, PS5, Xbox",
      "rating": "9.5",
      "image": "🗡️",
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
      "image": "🌴",
      "description": "Build your island life with adorable animal villagers.",
      "inStock": false
    },
  ]
```

## 🧩 Template Placeholders

These placeholders are used in the HTML templates:

```{%TITLE%}, {%GENRE%}, {%PRICE%}, {%PLATFORM%}, {%IMAGE%}, {%DESCRIPTION%}, {%ID%}```

## 🔀 Pages
![Screenshot 2025-04-15 at 4 09 18 PM](https://github.com/user-attachments/assets/66a370e2-9ab9-48f8-81b8-62a04ab1d2bc)


## 💡 Bonus Ideas
	•	Add filtering or sorting (by genre, platform, rating, etc.)
	•	Add a mock cart or wishlist
	•	Include game cover images using emojis or RAWG API
	•	Use slugify to create clean URLs like /product/elden-ring
