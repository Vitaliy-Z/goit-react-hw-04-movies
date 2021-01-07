const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '894ca333fc045e6297da6ee0c9fb4ee1';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

// список самых популярных фильмов на сегодня для создания коллекции на главной странице
//api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

export function fetchPopularMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/all/day?api_key=${KEY}&language=en-US`,
  );
}

// поиск кинофильма по ключевому слову на странице фильмов
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

export function fetchMovieByKeyword(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}

// запрос полной информации о фильме для страницы кинофильма
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
//         api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

export function fetchFullInformationOfMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`,
  );
}

// запрос информации о актёрском составе для страницы кинофильма
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

export function fetchInformationAboutCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
  );
}

// запрос обзоров для страницы кинофильма
// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

export function fetchReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}
