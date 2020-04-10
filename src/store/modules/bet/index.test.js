import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import betModule from '.'

describe('bet store', () => {
    const store = new Vuex.Store({
        modules: {
            betModule
        }
    }); // TODO: try using createLocalVue
    const initialStateCopy = JSON.parse(JSON.stringify(store.state))
    afterEach(() => {
        store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
    })

    it('has the right initial money', () => {
        expect(store.getters.getWallet).toEqual(100)
    });

    it('has the right money after placing a bet', () => {
        store.commit('placeBet', {
            uid: 1,
            betValue: 2,
            winnings: 0
        })
        expect(store.getters.getWallet).toEqual(98)
    });

    it('has the right money after placing two bets for the same uid', () => {
        store.commit('placeBet', {
            uid: 1,
            betValue: 2,
            winnings: 0
        })
        store.commit('placeBet', {
            uid: 1,
            betValue: 3,
            winnings: 1
        })
        expect(store.getters.getWallet).toEqual(95)
    });

    it('has the right money after winning two bets the same uid', () => {
        store.commit('placeBet', {
            uid: 'someId',
            betValue: 2,
            winnings: 10
        })
        store.commit('placeBet', {
            uid: 'someId',
            betValue: 3,
            winnings: 20
        })
        store.commit('settledBets', [{
            uid: 'someId',
            won: true
        }])
        expect(store.getters.getWallet).toEqual(125)
    });

    it('has the right money after winning a bet', () => {
        store.commit('placeBet', {
            uid: 3,
            betValue: 3,
            winnings: 5
        })
        expect(store.getters.getWallet).toEqual(97)
        store.commit('settledBets', [{
            uid: 3,
            won: true
        }])
        expect(store.getters.getWallet).toEqual(102)
    });

    it("doesn't give winnings for the same bet twice", () => {
        store.commit('placeBet', {
            uid: 7,
            betValue: 3,
            winnings: 5
        })
        expect(store.getters.getWallet).toEqual(97)
        store.commit('settledBets', [{
            uid: 7,
            won: true
        }])
        store.commit('settledBets', [{
            uid: 7,
            won: true
        }])
        expect(store.getters.getWallet).toEqual(102)
    });

    it('has the right money after winning a bet that is not in memory', () => {
        store.commit('settledBets', [{
            uid: 3,
            won: true
        }])
        expect(store.getters.getWallet).toEqual(100)
    });

    it('returns the right uids when called for the bets placed', () => {
        store.commit('placeBet', {
            uid: 3,
            betValue: 3,
            winnings: 5
        })
        expect(store.getters.getBetsUids).toEqual([3])
    });

    it('has the right money after losing a bet', () => {
        store.commit('placeBet', {
            uid: 99,
            betValue: 50,
            winnings: 500
        })
        expect(store.getters.getWallet).toEqual(50)
        store.commit('settledBets', [{
            uid: 99,
            won: false
        }])
        expect(store.getters.getWallet).toEqual(50)
    });
});
