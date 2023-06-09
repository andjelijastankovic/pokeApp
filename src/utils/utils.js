export const handleImageURL = (pokemonId) => {
    const str = "" + pokemonId;
    pokemonId = str.padStart(3, "0");
    return (`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`);
}