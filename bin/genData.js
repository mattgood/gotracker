
const fs = require('fs');
const gm = require('../data/game_master.json');
const shiny = require('../data/shiny_list.json');
const release_pokemon = require('../data/released_pokemon.json');


let mergeFiles = () => {
  return gm.map((pokemon) => {
    // console.log(shiny."1");
    let shinyIsAvailable = false;
    let pokemonIsAvailable = false;

    if (shiny[pokemon.dex]) {
      shinyIsAvailable = true;
    }
    if (release_pokemon[pokemon.dex]) {
      pokemonIsAvailable = true;
    }

    return Object.assign(
      {},
      {
        dex: pokemon.dex,
        name: pokemon.name,
        family: pokemon.family,
        evolution: pokemon.evolution,
        id: pokemon.id,
        forms: pokemon.forms,
        shinyIsAvailable: shinyIsAvailable,
        isAvailable: pokemonIsAvailable
      }
    );
  });

};

module.exports = mergeFiles;

// init 
(async () => {
  const newFileData = await mergeFiles();
  // console.dir(newFileData, {depth:null});
  fs.writeFileSync("../src/data/pokemon.json", JSON.stringify(newFileData, null, '  '));
})();