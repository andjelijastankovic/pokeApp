import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { handleImageURL } from '../../utils/utils';

export const Card = (name) => {
    const navigate = useNavigate();
    const [onePokemon, setOnePokemon] = useState([]);

    useEffect(() => {
        const fetchOnePokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.name}`);
            const data = await response.json();
            setOnePokemon(data);
        }

        fetchOnePokemon();
    }, [name])

    const navigateToPokemonInfo = () => {
        navigate(`/${name.name}`)
    }

    return (
        <div className="col-12 col-md-3 col-sm-4 my-3">
            <div className="card text-white bg-dark border-danger border-2" onClick={navigateToPokemonInfo}>
                <img src={onePokemon.id ? handleImageURL(onePokemon.id) : `https://i.imgflip.com/hirzn.jpg?a468192`} alt={name.name} className="card-img-top img-fluid w-50 mx-auto" />
                <div className="card-body">
                    <p className="text-center">{name.name}</p>
                </div>
            </div>
        </div>

    );
}