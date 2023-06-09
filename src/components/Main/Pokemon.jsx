import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleImageURL } from '../../utils/utils';

export const Pokemon = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState([]);
    const [like, setLike] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setPokemon(data);
        }

        fetchPokemon();

        const likes = JSON.parse(window.localStorage.getItem('LikedPokemons'));

        (likes || []).forEach(element => {
            if (like === true) {
                setLike(true);
            }
        });

    }, [name, like])

    const handleLike = (event) => {
        setLike(true);
        let likedPokemons = [];
        likedPokemons = JSON.parse(window.localStorage.getItem('LikedPokemons')) || [];
        const pokeInfo = { "pokemonName": pokemon.name, "liked": true };
        let onList = likedPokemons.some(obj => obj.pokemonName === pokeInfo.pokemonName);
        if (!onList) {
            likedPokemons.push(pokeInfo);
            localStorage.setItem('LikedPokemons', JSON.stringify(likedPokemons));
        }

    }

    return (
        <div className="container mx-auto text-center">
            <div className="row my-2">
                <div className="d-flex flex-column justify-content-center">
                    <h3> {pokemon.name}</h3>
                    <img className="img-fluid mx-auto d-block" src={handleImageURL(pokemon.id)} alt={pokemon.name} />
                    <button className={like === true ? "btn bg-success font-weight-bold text-light border-success w-25 mx-auto" : "btn bg-warning text-danger w-25 mx-auto"} onClick={handleLike}>Like</button>
                </div>

                <p className="p-1">Height: {pokemon.height}, weight: {pokemon.weight}</p>
            </div>

            <div className="row w-50 mx-auto">
                <div className="d-flex justify-content-around">
                    <div>
                        <h4>Abilities:</h4>
                        {
                            pokemon.abilities?.map((onePoke, i) => {
                                return (
                                    <ul className="list-group list-group-light list-group-small" key={i}>
                                        <li className="list-group-item m-1">
                                            {onePoke.ability.name}
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>

                    <div>
                        <h4>Types:</h4>

                        {
                            pokemon.types?.map((onePoke, i) => {
                                return (
                                    <ul className="list-group list-group-light list-group-small" key={i}>
                                        <li className="list-group-item m-1">
                                            {onePoke.type.name}
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}