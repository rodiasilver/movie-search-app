import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const routes = [
  { path: '/', redirect: '/search' },
  {
    path: '/search',
    name: 'home',
    component: Home,
  },
];

export default new Router({
  mode: 'history',
  base: '/',
  routes,
});