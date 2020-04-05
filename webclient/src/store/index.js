import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import BetManager from './BetManager';
import * as storeHelpers from './storeHelpers';

export default new Vuex.Store({
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
    ...storeHelpers.getMutations(BetManager, ["placeBet", "settledBets"])
  },
  actions: {},
  modules: {},
});
