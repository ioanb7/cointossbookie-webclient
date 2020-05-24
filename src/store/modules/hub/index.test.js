import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
jest.mock('@/helpers/networking');
import Networking from '@/helpers/networking';
import hubModule from '.'

describe('hub', () => {
    let mutations = {
        settledBets: jest.fn(),
        updateBetPlacer: jest.fn()
    }

    const store = new Vuex.Store({
        getters: {
            getBetsUids: () => ['someUid']
        },
        mutations: mutations,
        modules: {
            hubModule
        }
    });
    const initialStateCopy = JSON.parse(JSON.stringify(store.state))
    afterEach(() => {
        store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
    })

    it("networking is called on creation", async () => {
        expect(Networking).not.toHaveBeenCalled();
        // eslint-disable-next-line no-unused-vars
        store.commit("setUpHub")
        expect(Networking).toHaveBeenCalledTimes(1);
    })
    
    it("calls settle lose bet for a bet placed", async () => {
        store.commit("updateHub", {
            Markets: [{
                Id: 1,
                Outcomes: [{
                    Uid: 'someUid'
                }],
                Status: 'Settled'
            }]
        })
        expect(mutations.settledBets).toHaveBeenCalled()
        expect(mutations.settledBets).toHaveBeenLastCalledWith(expect.anything(), [{
            uid: 'someUid',
            won: false
        }])
    })

    it("calls settle win bet for a bet placed", async () => {
        store.commit("updateHub", {
            Markets: [{
                Outcomes: [{
                    Uid: 'someUid',
                    TrueProbability: 1
                }],
                Status: 'Settled'
            }]
        })
        expect(mutations.settledBets).toHaveBeenCalled()
        expect(mutations.settledBets).toHaveBeenLastCalledWith(expect.anything(), [{
            uid: 'someUid',
            won: true
        }])
    })

    it("caches data for the next game until confirmed", async () => {
        store.commit("updateHub", {
            Markets: [{
                Outcomes: [{
                    Uid: 'someUid',
                    TrueProbability: 0.9
                }],
                Status: 'Open'
            }],
            GameId: 88
        })

        expect(store.getters.allGames).toContainKey(88)
        store.commit("updateHub", {
            Markets: [{
                Outcomes: [{
                    Uid: 'someUid',
                    TrueProbability: 0.9
                }],
                Status: 'Open'
            }],
            GameId: 7
        })
        expect(store.getters.allGames).toContainKey(7)
        expect(store.getters.latestGameId).toEqual(7)
        expect(store.getters.currentGame.GameId).toEqual(7)
    })

    it("changes isConnected and connectionProgress", async () => {
        expect(store.getters.isConnected).toBe(false)
        expect(store.getters.connectionProgress).toBe(0)
        store.commit("updateHub", {
            Markets: [{
                Outcomes: [{
                    Uid: 'someUid',
                    TrueProbability: 0.9
                }],
                Status: 'Open'
            }],
            GameId: 88
        })
        expect(store.getters.isConnected).toBe(true)
        expect(store.getters.connectionProgress).toBe(0)
    })
})