/**
 * replaceTemplate.js
 * -------------------
 * This module exports a function that takes an HTML card template string (`temp`)
 * and a game object (`game`) from the RAWG API. It replaces placeholders in the 
 * template with actual game data and returns the finalized HTML string.
 *
 * Main responsibilities:
 * - Inject game data into the template (e.g., name, genre, playtime)
 * - Dynamically generate and insert platform icons
 * - Add stock availability badge
 * - Use fallback values and basic error handling for safety
 */

module.exports = (temp, game) => {
  // Basic template replacements
  let output = temp.replace(/{%GAMENAME%}/g, game.title);
  output = output.replace(/{%IMAGE%}/g, game.image);
  output = output.replace(/{%PRICE%}/g, game.price);
  output = output.replace(/{%PLATFORM%}/g, game.platform);
  output = output.replace(/{%GENRE%}/g, game.genre);
  output = output.replace(/{%METACRITIC%}/g, game.metacritic);
  output = output.replace(/{%RELEASE%}/g, game.released);
  output = output.replace(/{%PLAYTIME%}/g, game.playtime);
  output = output.replace(/{%RATINGSCOUNT%}/g, game.ratingsCount);
  output = output.replace(/{%TRAILER%}/g, game.trailer || '#');
  output = output.replace(/{%DESCRIPTION%}/g, game.description);
  output = output.replace(/{%ID%}/g, game.id);

  // 🕹 Platform icon HTML injection with try/catch for safety
  try {
    // Icon map: key => image tag
    const platformIcons = {
      pc: '<img src="/icons/platforms/icons8-windows-48.png" alt="PC" class="platform-icon" />',
      xbox: '<img src="/icons/platforms/icons8-xbox-48.png" alt="Xbox" class="platform-icon" />',
      playstation: '<img src="/icons/platforms/icons8-playstation-48.png" alt="PlayStation" class="platform-icon" />',
      nintendo: '<img src="/icons/platforms/icons8-nintendo-48.png" alt="Nintendo" class="platform-icon" />',
      android: '<img src="/icons/platforms/icons8-android-48.png" alt="Android" class="platform-icon" />',
      macintosh: '<img src="/icons/platforms/icons8-apple-48.png" alt="Macintosh" class="platform-icon" />',
      ios: '<img src="/icons/platforms/icons8-ios-48.png" alt="iOS" class="platform-icon" />',
      linux: '<img src="/icons/platforms/icons8-linux-48.png" alt="Linux" class="platform-icon" />'
    };

    let platformIconsHTML = '';

    if (game.platform) {
      // Normalize and split platforms
      const platformList = game.platform
        .split(',')
        .map(p => p.trim().toLowerCase());

      // Match each platform to available icons
      for (const key in platformIcons) {
        if (platformList.some(p => p.includes(key))) {
          platformIconsHTML += platformIcons[key];
        }
      }
    }

    // If no match, show fallback "N/A"
    if (!platformIconsHTML) {
      platformIconsHTML = '<span class="platform-icon-na">N/A</span>';
    }

    output = output.replace(/{%PLATFORM_ICONS%}/g, platformIconsHTML);
  } catch (err) {
    console.error('Platform icon mapping failed:', err.message);
    output = output.replace(
      /{%PLATFORM_ICONS%}/g,
      '<span class="platform-icon-na">N/A</span>'
    );
  }

  // 🏷 In stock badge
  output = output.replace(
    /{%NOT_AVAILABLE%}/g,
    game.inStock ? 'in-stock' : 'not-available'
  );

  return output;
};