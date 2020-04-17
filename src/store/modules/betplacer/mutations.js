

function getMarketForOutcomeId(game, outcomeId) {
    let marketFound = null
    game.Markets.forEach(market => {
        market.Outcomes.forEach(outcome => {
            if (outcome.Uid == outcomeId) {
                marketFound = market
            }
        });
    });
    return marketFound
}


export default {
    addOrReplaceBetPlacer(state, {marketType, marketId, outcomeId, price}) {
        if (!marketType || !marketId) {
            var latestGame = this.getters.currentGame
            var market = getMarketForOutcomeId(latestGame, outcomeId)
            if (!market) {
                throw `Couldn't find market id and market type for outcome id ${outcomeId}`
            }

            marketType = market.MarketType
            marketId = market.Id
        }

        for (let index = 0; index < state.betPlacers.length; index++) {
            const betPlacer = state.betPlacers[index];
            if (betPlacer.marketType == marketType) {
                state.betPlacers[index].marketId = marketId
                state.betPlacers[index].outcomeId = outcomeId
                state.betPlacers[index].price = price
                return
            }
        }

        state.betPlacers = state.betPlacers.concat([{
            marketType,
            marketId,
            outcomeId,
            price
        }])
    },
    
    updateBetPlacer(state, marketIdsAndStatuses) {
        state.betPlacers = state.betPlacers
            .filter(betPlacer =>
                !marketIdsAndStatuses.find(val => val.marketId == betPlacer.marketId))
    },

    cancelBetPlacer(state, outcomeId) {
        var latestGame = this.getters.currentGame

        let marketTypeForThisBet = getMarketForOutcomeId(latestGame, outcomeId).MarketType
        state.betPlacers = state.betPlacers.filter(betPlacer => {
            let marketTypeForThisBetPlacer = getMarketForOutcomeId(latestGame, betPlacer.outcomeId).MarketType
            return marketTypeForThisBet != marketTypeForThisBetPlacer
        })
    }
}