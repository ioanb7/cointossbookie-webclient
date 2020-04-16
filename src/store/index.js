import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
import betModule from './modules/bet'
import betPlacerModule from './modules/betplacer'
import hubModule from './modules/hub'

const store = new Vuex.Store({
  modules: {
    betModule,
    betPlacerModule,
    hubModule
  }
})
export default store