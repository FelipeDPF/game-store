# 📦 Changelog

All notable changes to this project will be documented in this file.

## [v1.2.0-beta01] - 2025-05-05

### Added
- New `fetchGames.js` utility to retrieve a static list of games from RAWG API.
- New `fetchGamesSearch.js` utility to fetch game data dynamically via query.
- `.env` support for securely managing RAWG API key.
- Search bar in `template-overview.html` with query redirect logic.
- Pagination system to support multiple result pages dynamically
- Metascore badge system with color-coded styles (green/yellow/gray).
- Game platform icons now replace raw platform text labels.
- Updated overall typography and header layout for a more polished look.
- `.gitignore` now excludes `.env` file.

### Changed
- Replaced mock rating logic with real Metascore integration.
- Refactored and cleaned up HTML/JS indentation and formatting.
- `README.md` updated with new architecture and feature documentation.

### Removed
- Legacy `data.json` mock file, replaced by dynamic RAWG API integration.

---

## [v1.1.0] - 2025-05-23
### Added
- “See more” / “See less” toggle for expanding and collapsing game cards.
- Conditional “In Stock” badge that reflects availability based on mock data.
- Integrated RAWG cover images using static URLs.

### Changed
- Updated overall card layout and overview page for a cleaner UI.
- Improved mobile responsiveness and spacing.
- Refined README.md to highlight new layout and features.

---

## [v1.0.0] - 2025-05-21
### 🎮 Initial release of the Game Store project
A Node.js app that displays video game cards using mock data from a static `data.json` file.

### Features
- Display game cards with mock title, genre, price, platform, and rating.
- Card layout includes emoji-based icons as placeholder images.
- “See more” button reveals additional game details.
- Basic project structure and modular layout with placeholder template engine.
- Static UI showcasing local mock data only — no external API integration yet.