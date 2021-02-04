import Vue from 'vue'
import Vuex from 'vuex'
import regionSelector from './modules/regionSelector'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    regionSelector
  }
})
export default store
