import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

class BetterCode {
  constructor(state) {
    this.state = state
  }
  placeBet({ outcomeUid, betValue, winnings }) {
    this.state.money -= betValue; //

    if (this.findBet(outcomeUid)) {
      this.addToBet(outcomeUid, winnings);
    } else {
      this.addBet(outcomeUid, winnings);
    }
  }

  addToBet(uid, winnings) {
    var bet = this.findBet(uid);
    bet.winnings += winnings;
  }

  addBet(uid, winnings) {
    this.state.bets.push({
      uid,
      winnings,
    });
  }

  findBet(uid) {
    return this.state.bets.find((b) => b.outcomeUid == uid);
  }

  settledBets(payload) {
    payload.forEach((element) => {
      var { uid, won } = element;
      if (won) {
        var bet = this.findBet(uid);
        if (bet) {
          this.state.money += bet.winnings; //
        }
      }
      //delete where uid..
      this.state.bets = this.state.bets.filter((b) => b.outcomeUid != uid); //deleteBet
    });
  }
}

var getMutations = (classType, mutationNames) => {
  var dict = {}
  mutationNames.forEach(mutationName => {
    dict[mutationName] = function(state, payload) {
      var instance = new classType(state)
      instance[mutationName](payload)
    }
  });
  return dict
}

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
  mutations: getMutations(BetterCode, ['placeBet', 'settledBets']),
  actions: {},
  modules: {},
});
