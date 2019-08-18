import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import MovieDetails from '@/views/MovieDetails.vue';

Vue.use(Router);

const routes = [
  { path: '/', redirect: '/search' },
  {
    path: '/search',
    name: 'home',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MovieDetails,
  },
];

export default new Router({
  mode: 'history',
  base: '/',
  routes,
});
