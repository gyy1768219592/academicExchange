import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Authorization: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      sessionStorage.setItem('Authorization',user.Authorization);
    }
  },
  actions: {},
  modules: {}
});
