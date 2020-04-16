
export default {
    addOrReplaceBetPlacer(state, {marketType, marketId, outcomeId, price}) {
        if (!marketType || !marketId) {
            var latestGame = this.getters.currentGame

            latestGame.Markets.forEach(market => {
                market.Outcomes.forEach(outcome => {
                    if (outcome.Uid == outcomeId) {
                        marketType = market.MarketType
                        marketId = market.Id
                    }
                });
            });

            if (!marketType || !marketId) {
                throw `Couldn't find market id and market type for outcome id ${outcomeId}`
            }
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
        state.betPlacers = state.betPlacers.filter(betPlacer => betPlacer.outcomeId != outcomeId)
    }
}