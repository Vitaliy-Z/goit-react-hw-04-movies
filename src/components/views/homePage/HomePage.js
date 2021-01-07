import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../../Api/serviceApi';
import homePageStyles from './homePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(({ results }) => setMovies(results));
  }, []);

  return (
    <div className={homePageStyles.container}>
      <h1 className={homePageStyles.title}>Trending today</h1>
      {movies && (
        <ul className={homePageStyles.list}>
          {movies.map(movie => (
            <li key={movie.id} className={homePageStyles.item}>
              <Link
                to={`/movies/${movie.id}`}
                className={homePageStyles.titleFilm}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
                  }
                  alt={movie.title || movie.name}
                  width="100%"
                ></img>
                <h3>{movie.title || movie.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
