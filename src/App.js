import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation/navogation';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Container from './components/container/Container';

const HomePage = lazy(() =>
  import(
    './components/views/homePage/HomePage' /*webpackChunkName: "home-page"*/
  ),
);
const MoviesPage = lazy(() =>
  import(
    './components/views/moviesPage/MoviesPage' /*webpackChunkName: "movies-page"*/
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/views/movieDetailsPage/MovieDetailsPage' /*webpackChunkName: "movie-details-page"*/
  ),
);

export default function App() {
  return (
    <Container>
      <Navigation />

      <Suspense
        fallback={
          <Loader type="Bars" color="#2196f3" height={100} width={500} />
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
