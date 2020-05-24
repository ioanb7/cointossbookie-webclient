import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import betPlacer from '.'

describe('betplacer', () => {
    const game = {
        Markets: [{
            MarketType: "someMarketType",
            Id: 2,
            Outcomes: [{
                Uid: 3
            }]
        }]
    }
    const store = new Vuex.Store({
        getters: {
            currentGame() {
                return game
            },
            getMarketForOutcomeId() {
                return (uid) => {
                    if (uid == "OutcomeIdDOESNOTEXIST")
                        return null;
                    return game.Markets[0]
                }
            }
        },
        modules: {
            betPlacer
        }
    });
    const initialStateCopy = JSON.parse(JSON.stringify(store.state))
    afterEach(() => {
        store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
    })

    it('returns 0 bet placers by default', () => {
        expect(store.getters.allBetPlacers.length).toBe(0)
    });

    it('can add a bet placer for a outcome', () => {
        store.commit("addOrReplaceBetPlacer", {
            marketType: "Something",
            marketId: 30,
            outcomeId: "OutcomeId",
            price: 2
        })
        expect(store.getters.allBetPlacers).toBeArrayOfSize(1)
    });

    it('can remove a bet placer for an outcome (by the bet placer itself when pressing X)', () => {
        store.commit("addOrReplaceBetPlacer", {
            marketType: "Something",
            marketId: 30,
            outcomeId: "someOutcomeId",
            price: 2
        })
        store.commit("cancelBetPlacer", "someOutcomeId")
        expect(store.getters.allBetPlacers).toBeArrayOfSize(0)
    });

    it('can have two bet placers for two different market types', () => {
        let betPlacer1 = {
            marketType: "Flip(n)",
            marketId: 40,
            outcomeId: "OutcomeId",
            price: 2
        }
        let betPlacer2 = {
            marketType: "FlipExactOrder(n)",
            marketId: 33,
            outcomeId: "OutcomeId",
            price: 2
        }
        store.commit("addOrReplaceBetPlacer", betPlacer1)
        store.commit("addOrReplaceBetPlacer", betPlacer2)
        expect(store.getters.allBetPlacers).toBeArrayOfSize(2)
    });

    it('replaces the open betplacer for a market type if it\'s already registered', () => {
        let betPlacer1 = {
            marketType: "Flip(n)",
            marketId: 77,
            outcomeId: "OutcomeId",
            price: 90
        }
        let betPlacer2 = {
            marketType: "Flip(n)",
            marketId: 31,
            outcomeId: "OutcomeId2",
            price: 4
        }
        store.commit("addOrReplaceBetPlacer", betPlacer1)
        store.commit("addOrReplaceBetPlacer", betPlacer2)

        expect(store.getters.allBetPlacers).toStrictEqual([betPlacer2])
    });

    it('removes bet placer if the market is not open', () => {
        let betPlacer = {
            marketType: "Flip(n)",
            marketId: 211,
            outcomeId: "OutcomeId",
            price: -3
        }
        store.commit("addOrReplaceBetPlacer", betPlacer)
        store.commit("updateBetPlacer", [{
            marketId: 211,
            isOpen: false
        }])

        expect(store.getters.allBetPlacers).toBeArrayOfSize(0)
    });

    it('does not remove bet placer if the market is open', () => {
        let betPlacer = {
            marketType: "Flip(n)",
            marketId: 211,
            outcomeId: "OutcomeId",
            price: -3
        }
        store.commit("addOrReplaceBetPlacer", betPlacer)
        store.commit("updateBetPlacer", [{
            marketId: 211,
            isOpen: true
        }])

        expect(store.getters.allBetPlacers).toBeArrayOfSize(1)
    });
    
    it('is able to put bet after it has been removed', () => {
        let betPlacer = {
            marketType: "Flip(n)",
            marketId: 299,
            outcomeId: "OutcomeId2",
            price: -7
        }
        store.commit("addOrReplaceBetPlacer", betPlacer)
        store.commit("updateBetPlacer", [{
            marketId: 299,
            isOpen: false
        }])
        store.commit("addOrReplaceBetPlacer", betPlacer)
        expect(store.getters.allBetPlacers).toBeArrayOfSize(1)
    });

    it('is able to find details about the bet even just by having the id', () => {
        let betPlacerFull = {
            marketType: "someMarketType",
            marketId: 2,
            outcomeId: "3",
            price: -7
        }
        let betPlacerMini = {
            outcomeId: "3",
            price: -7
        }
        store.commit("addOrReplaceBetPlacer", betPlacerMini)
        expect(store.getters.allBetPlacers).toStrictEqual([betPlacerFull])
    });
    
    it('throws if it\'s not able to find details about the bet even just by having the id', () => {
        let betPlacerMini = {
            outcomeId: "OutcomeIdDOESNOTEXIST",
            price: -7
        }
        expect(() => store.commit("addOrReplaceBetPlacer", betPlacerMini)).toThrow()
    });
    
});
