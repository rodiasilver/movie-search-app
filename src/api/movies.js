import axios from 'axios';
import { SEARCH_PARAMS } from '@/config/constants';

function getMovies(criteria) {
  return axios
    .get(SEARCH_PARAMS.URL, {
      params: {
        [SEARCH_PARAMS.MOVIE_TITLE]: criteria.title,
        [SEARCH_PARAMS.MOVIE_YEAR]: criteria.year,
        [SEARCH_PARAMS.PAGE]: criteria.page,
      },
    })
    .then(response => response.data)
    .catch((error) => {
      console.log(error);
    });
}

function getMovieDetails(id) {
  return axios
    .get(SEARCH_PARAMS.URL, {
      params: {
        [SEARCH_PARAMS.ID]: id,
      },
    })
    .then(response => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export default {
  getMovies,
  getMovieDetails,
};
