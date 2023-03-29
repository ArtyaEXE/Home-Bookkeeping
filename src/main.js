/* eslint-disable */
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import dateFilter from '@/filters/date.filter';
import localizeFilter from './filters/localize.filter';
import currencyFilter from './filters/currency.filter';
import tooltipDirective from './directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyBIekrl0IIU0unx5Ot7HZUH__ajo2KGmGo',
  authDomain: 'money-checker-vue.firebaseapp.com',
  databaseURL: 'https://money-checker-vue-default-rtdb.firebaseio.com/',
  projectId: 'money-checker-vue',
  storageBucket: 'money-checker-vue.appspot.com',
  messagingSenderId: '151372057597',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
