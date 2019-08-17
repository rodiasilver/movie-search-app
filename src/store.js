import Vue from 'vue';
import Vuex from 'vuex';
import moviesApi from '@/api/movies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    currentCriteria: {},
    currentPage: 1,
    totalResults: null,
  },
  getters: {
    hasNextPage(state) {
      return state.currentPage * 10 < state.totalResults;
    },
    totalPages(state) {
      return Math.ceil(state.totalResults / 10);
    },
  },
  mutations: {
    SET_MOVIES(state, results) {
      state.results = results.Search;
      state.totalResults = results.totalResults;
    },
    SET_CURRENT_PAGE(state, pageNumber) {
      state.currentPage = pageNumber;
    },
    SET_CURRENT_CRITERIA(state, criteria) {
      Object.assign(state.currentCriteria, criteria);
    },
  },
  actions: {
    async getMovies({ commit }, criteria) {
      const results = await moviesApi.getMovies(criteria);
      commit('SET_MOVIES', results);
      commit('SET_CURRENT_CRITERIA', criteria);
    },
    turnPage({ commit, state, dispatch }, page) {
      commit('SET_CURRENT_PAGE', page);
      commit('SET_CURRENT_CRITERIA', { page });
      dispatch('getMovies', state.currentCriteria);
    },
    resetPages({ commit }) {
      commit('SET_CURRENT_PAGE', 1);
    },
  },
});
