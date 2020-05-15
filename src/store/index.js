import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {
    switchSideBar(state){
      state.isCollapse = !state.isCollapse
    },
  },
  actions: {},
  modules: {}
});
export default store
