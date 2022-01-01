import Vue from 'vue';
import Vuex from 'vuex';
import linkApi from '@/api/link';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    login(state, token: string) {
      state.token = token;
      linkApi.setAPIToken(token);
    },
    logout(state) {
      state.token = '';
    },
  },
  actions: {
  },
  getters: {
    isLogined(state) {
      return state.token !== '';
    },
  },
  modules: {
  },
});
