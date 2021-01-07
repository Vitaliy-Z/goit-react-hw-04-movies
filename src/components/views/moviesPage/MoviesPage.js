import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMovieByKeyword } from '../../Api/serviceApi';
import moviesPage from './moviesPage.module.css';

export default function HomePage() {
  const [inputQuery, setInputQuery] = useState('');
  const [findingMovies, setFindingMovies] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (searchQuery) {
      fetchMovieByKeyword(searchQuery).then(({ results }) =>
        setFindingMovies(results),
      );
    }
  }, [searchQuery]);

  const handleSubmit = evt => {
    evt.preventDefault();

    history.push({ ...location, search: `query=${inputQuery}` });

    fetchMovieByKeyword(searchQuery).then(({ results }) =>
      setFindingMovies(results),
    );

    setInputQuery('');
  };

  return (
    <div className={moviesPage.container}>
      <form
        className={moviesPage.form}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label className={moviesPage.label}>
          What movie do you want to find?
          <input
            className={moviesPage.input}
            name="name"
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
          />
        </label>

        <button className={moviesPage.btn} type="submit">
          Search
        </button>
      </form>

      {findingMovies && (
        <ul className={moviesPage.list}>
          {findingMovies.map(movie => (
            <li key={movie.id} className={moviesPage.item}>
              <Link to={`${url}/${movie.id}`} className={moviesPage.titleFilm}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
                  }
                  alt={movie.title || movie.name}
                  width="100%"
                ></img>
                <h2>{movie.title || movie.name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
