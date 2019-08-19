import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import VueLodash from 'vue-lodash';
import App from './App.vue';
import router from './router';
import store from './store';


import '@/assets/css/normalize.css';
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/main.css';

Vue.use(VueProgressBar, {
  color: 'rgb(2, 117, 216)',
  failedColor: 'red',
  height: '4px',
});

Vue.use(VueLodash, {
  name: 'lodash',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
