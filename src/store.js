import Vue from 'vue';
import Vuex from 'vuex';
import moviesApi from '@/api/movies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    totalResults: null,
    response: null,
    isLoading: false,
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
    SET_LOADING_STATUS(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    async getMovies({ commit }, criteria) {
      commit('SET_LOADING_STATUS', true);
      const results = await moviesApi.getMovies(criteria);
      commit('SET_MOVIES', results);
      commit('SET_LOADING_STATUS', false);
    },
  },
});
