import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter.js';
import currencyFilter from '@/filters/currency.filter.js';
import Paginate from 'vuejs-paginate';

import tooltipDirective from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader.vue';

import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import localizeFilter from './filters/loacalize.filter';
// import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

const firebaseConfig = {
  apiKey: "AIzaSyClBUrKqJ7OgIJBDqFnRV-wE3aCkq39uqs",
  authDomain: "crmsystem-2a0ae.firebaseapp.com",
  databaseURL: "https://crmsystem-2a0ae.firebaseio.com",
  projectId: "crmsystem-2a0ae",
  storageBucket: "crmsystem-2a0ae.appspot.com",
  messagingSenderId: "736807889384",
  appId: "1:736807889384:web:d719c087dbd92e11021c5d",
  measurementId: "G-M80M2C18HX"
};

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');  
  };
});


