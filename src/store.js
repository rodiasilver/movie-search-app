import Vue from 'vue';
import Vuex from 'vuex';
import moviesApi from '@/api/movies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    totalResults: null,
    response: null,
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.totalResults / 10);
    },
    hasNoMovies(state) {
      return state.response === 'False';
    },
  },
  mutations: {
    SET_MOVIES(state, results) {
      state.results = results.Search;
      state.totalResults = results.totalResults;
      state.response = results.Response;
    },
  },
  actions: {
    async getMovies({ commit }, criteria) {
      const results = await moviesApi.getMovies(criteria);
      commit('SET_MOVIES', results);
    },
  },
});
