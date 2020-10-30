import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error){
      state.error = error;
    },
    clearError(state){
      state.error = null;
    }
  },
  getters: {
    error: s => s.error,
  },
  actions: {
    async fetch_currency() {
      const rates_url = 'https://www.cbr-xml-daily.ru/daily_json.js';
      const res = await fetch(rates_url);
      let r = await res.json();
      let y = {
        Date: r.Timestamp,
      };
      y.Valute = {
        AMD: r.Valute.AMD,
        USD: r.Valute.USD,
        EUR: r.Valute.EUR,
        RUB: {
          Nominal: 1,
          Value: 1
        },
      };
    
      return y;
    },
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
