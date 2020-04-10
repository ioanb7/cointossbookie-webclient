import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import betModule from './modules/bet'

const store = new Vuex.Store({
  modules: {
    betModule
  }
})
export default store