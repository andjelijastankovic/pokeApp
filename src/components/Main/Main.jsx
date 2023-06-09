import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Link } from 'react-router-dom';

export const Main = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=864');
      const data = await response.json();
      setPokemonData(data.results);
      setTotalPages(data.results.length / 24);
    }

    fetchAllData();
  }, []);

  const pageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  }

  const pokemonsUI = () => {
    return pokemonData.filter((pokemon) => {
      return searchValue.toLowerCase() === '' ?
        pokemon : pokemon.name.toLowerCase().includes(searchValue);
    }).slice(page * 24 - 24, page * 24).map(({ name, url }) => (
      <Card key={url} name={name} />
    ))
  }

  const sortAtoZ = () => {
    const sortAtoZ = [...pokemonData];
    const sort = sortAtoZ.sort((a, b) => a.name < b.name ? -1 : 1);
    setPokemonData([...sort]);
  }

  const sortZtoA = () => {
    let sortZtoA = [...pokemonData];
    let sorting = sortZtoA.sort((a, b) => a.name < b.name ? -1 : 1);
    const sortedZtoA = sorting.reverse();
    setPokemonData([...sortedZtoA]);
  }

  return (
    <div className=" pt-1 pb-5">
      <div className="mb-5">
        <div className=" mx-3 py-1 d-flex flex-column flex-md-row justify-content-center">
          <form action="" className="col-12 col-md-5 p-1">
            <input type="search" className="form-control border-danger border-2" placeholder="Search Pokemon"
              onChange={(e) => setSearchValue(e.target.value)} />
          </form>

          <div className="btn-group col-12 col-md-2 p-1">
            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort Pokemons
            </button>

            <div className="dropdown-menu w-100 text-center">
              <a className="dropdown-item" href="#" onClick={sortAtoZ}>A-Z</a>
              <a className="dropdown-item" href="#" onClick={sortZtoA}>Z-A</a>
            </div>
          </div>

        </div>

        <div className="row mx-4">
          {pokemonsUI()}
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center fixed-bottom">
        {
          pokemonData.length > 0 &&
          <div aria-label="Page navigation example" className=" mx-3 d-flex justify-content-center">
            <ul className="pagination">
              <li className={page === 1 ? "d-none" : "page-item"}><a className="page-link text-dark border-danger border-2" href="#" onClick={() => pageHandler(page - 1)}>Previous</a></li>
              <li className="page-item"><a className="page-link text-dark border-danger border-2" href="#">{page}</a></li>
              <li className={page === totalPages ? "d-none" : "page-item"}><a className="page-link text-dark border-danger border-2" href="#" onClick={() => pageHandler(page + 1)}>Next</a></li>
            </ul>
          </div>
        }

        <footer className="bg-dark">
          <div className="d-flex align-items-center justify-content-center justify-content-md-center">
            <p className="text-light  my-2">&copy; <Link to='https://www.linkedin.com/in/andjelija-stankovic/' target="_blank" className="text-decoration-none pokeLink font-weight-bold">Andjelija Stankovic</Link></p>
          </div>
        </footer>
      </div>
    </div>
  );

}