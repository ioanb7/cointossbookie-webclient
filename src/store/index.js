import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import BetManager from './BetManager';
import * as storeHelpers from './storeHelpers';
import Counter2 from '../store/storeExample'
import {
  getModule
} from 'vuex-module-decorators';

const store = new Vuex.Store({
  state: {
    money: 100,
    bets: [],
  },
  getters: {
    getWallet(state) {
      return state.money;
    },
    getBetsUids(state) {
      return state.bets.map((b) => b.outcomeUid);
    },
  },
  mutations: {
      ...storeHelpers.getPublicMutations(BetManager)
  },
  actions: {},
  modules: {},
  modules: {
    counter2: Counter2
  }
});
export default store
export const Counter2Module = getModule(Counter2, store);