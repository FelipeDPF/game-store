module.exports = (temp, game) => {
    let output = temp.replace(/{%GAMENAME%}/g, game.title);
    output = output.replace(/{%IMAGE%}/g, game.image);
    output = output.replace(/{%PRICE%}/g, game.price);
    output = output.replace(/{%PLATFORM%}/g, game.platform);
    output = output.replace(/{%GENRE%}/g, game.genre);
    output = output.replace(/{%RATING%}/g, game.rating);
    output = output.replace(/{%RELEASE%}/g, game.releaseDate);
    output = output.replace(/{%DESCRIPTION%}/g, game.description);
    output = output.replace(/{%ID%}/g, game.id);
  
    output = output.replace(/{%NOT_AVAILABLE%}/g, game.inStock ? 'in-stock' : 'not-available');
  
    return output;
  };