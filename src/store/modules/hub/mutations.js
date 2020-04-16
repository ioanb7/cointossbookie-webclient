function getMySettledBets(bets, markets) {
    let settledMarkets = markets.filter(m => m.Status == 'Settled')
    let settledOutcomes = settledMarkets.flatMap(m => m.Outcomes)
    let mySettledOutcomes = settledOutcomes.filter(o => bets.includes(o.Uid))
    if (mySettledOutcomes.length) {
        return mySettledOutcomes.map(o => ({
            uid: o.Uid,
            won: o.TrueProbability == 1.0
        }))
    }
    return null;
}

function getAllMarketsMarketIdsAndStatuses(markets) {
    let openMarkets = markets.filter(m => m.Status == 'Open')
    let nonOpenMarkets = markets.filter(m => m.Status != 'Open')
    let openMarketsMarketIdsAndStatuses = openMarkets.map(market => ({
        marketId: market.Id,
        isOpen: true
    }))
    let nonOpenMarketsMarketIdsAndStatuses = nonOpenMarkets.map(market => ({
        marketId: market.Id,
        isOpen: false
    }))
    return openMarketsMarketIdsAndStatuses.concat(nonOpenMarketsMarketIdsAndStatuses)
}

var loadingInterval = null

function setUpTimer(state) {
    state.connectionProgress = 0
    loadingInterval = setInterval(function () {
        state.connectionProgress++
    }, 1000)
}

function clearLoadingIntervalWhenFirstUpdateIsReceived(state) {
    if (loadingInterval !== null) {
        clearInterval(loadingInterval)
        loadingInterval = null
    }
    state.connectionProgress = 0
    state.isConnected = true
}
import Networking from '@/helpers/networking';
import Vue from 'vue';

export default {
    setUpHub(state) {
        setUpTimer(state)
        var networking = new Networking((data) => this.commit("updateHub", data));
        networking.run()
    },
    updateHub(state, data) {
        let bets = this.getters.getBetsUids
        let mySettledBets = getMySettledBets(bets, data.Markets)
        if (mySettledBets) {
            this.commit('settledBets', mySettledBets)
        }
        
        state.latestGameId = data.GameId
        Vue.set(state.games, data.GameId, data)
        
        this.commit("updateBetPlacer", getAllMarketsMarketIdsAndStatuses(data.Markets))
        clearLoadingIntervalWhenFirstUpdateIsReceived(state)
    }
}