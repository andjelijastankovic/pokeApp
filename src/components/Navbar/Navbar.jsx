import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-dark">
            <div className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-center">
                <Link to='/' className="text-decoration-none"><h3 className="pokeLink px-5 py-2 my-2 font-weight-bold">PokemonApp</h3></Link>
            </div>
        </nav>
    );
}