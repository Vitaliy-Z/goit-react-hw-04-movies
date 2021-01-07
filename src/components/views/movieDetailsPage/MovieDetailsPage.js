import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, NavLink, Route } from 'react-router-dom';
import { fetchFullInformationOfMovie } from '../../Api/serviceApi';
import movieDetailsPage from './movieDetailsPage.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Cast = lazy(() => import('../cast/Cast' /*webpackChunkName: "cast"*/));
const Review = lazy(() =>
  import('../review/Review' /*webpackChunkName: "review"*/),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchFullInformationOfMovie(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <div>
          <div className={movieDetailsPage.movieContainer}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
              }
              alt={movie.title || movie.name}
              className={movieDetailsPage.image}
            ></img>

            <div className={movieDetailsPage.informationContainer}>
              <h2 className={movieDetailsPage.title}>
                {movie.title || movie.name}
              </h2>

              <p className={movieDetailsPage.genres}>
                Genres:
                <span className={movieDetailsPage.text}>
                  {' '}
                  {movie.genres.map(genre => genre.name).join(' / ')}
                </span>
              </p>

              <p className={movieDetailsPage.releaseData}>
                Release date:
                <span className={movieDetailsPage.text}>
                  {' '}
                  {movie.release_date || ''}{' '}
                </span>
              </p>

              <p className={movieDetailsPage.vote}>
                Vote: <span> {movie.vote_average} </span>/ Votes:{' '}
                <span className={movieDetailsPage.text}>
                  {' '}
                  {movie.vote_count}{' '}
                </span>
              </p>

              <p className={movieDetailsPage.about}>
                About:
                <span className={movieDetailsPage.text}> {movie.overview}</span>
              </p>
            </div>
          </div>
          <hr />

          <ul className={movieDetailsPage.additionalList}>
            <p className={movieDetailsPage.title}>Additional informatoin: </p>
            <li className={movieDetailsPage.addtionalItem}>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li className={movieDetailsPage.addtionalItem}>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>

          <hr />
          <Suspense
            fallback={
              <Loader type="Bars" color="#2196f3" height={100} width={300} />
            }
          >
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${path}/reviews`}>
              <Review movieId={movieId} />
            </Route>
          </Suspense>
        </div>
      )}
    </>
  );
}
