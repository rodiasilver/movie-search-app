import axios from 'axios';

const URL = 'http://www.omdbapi.com/?apikey=e7828b6';
const MOVIE_TITLE = 's';
const MOVIE_YEAR = 'y';
const PAGE = 'page';

function getMovies(criteria) {
  return axios
    .get(URL, {
      params: {
        [MOVIE_TITLE]: criteria.title,
        [MOVIE_YEAR]: criteria.year,
        [PAGE]: criteria.page,
      },
    })
    .then(response => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export default {
  getMovies,
};
