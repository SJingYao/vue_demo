import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isCollapse: false,
    count: 0
  },
  mutations: {
    addCount(state, payload) {
      state.count++
    },
    subtractCount(state) {
      state.count <= 0 ? '' : state.count--
    },
    switchSideBar(state) {
      state.isCollapse = !state.isCollapse
    },
    getdate(state){

    }
  },
  actions: {
    getdata(state) {
      this.axiox({
        method:'post',
        url:'/getdata'
      }).then((re) => { 
        $store.commit('getdate')
      })
    }
  },
  modules: {}
})
export default store
