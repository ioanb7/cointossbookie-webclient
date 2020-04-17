




export default {
    addOrReplaceBetPlacer(state, {marketType, marketId, outcomeId, price}) {
        if (!marketType || !marketId) {
            var market = this.getters.getMarketForOutcomeId(outcomeId)
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
        let marketIdsToDelete = marketIdsAndStatuses.filter(val => !val.isOpen).map(val => val.marketId)
        state.betPlacers = state.betPlacers
            .filter(betPlacer =>
                !marketIdsToDelete.includes(betPlacer.marketId))
    },

    cancelBetPlacer(state, outcomeId) {
        debugger; // eslint-disable-line
        let marketTypeForThisBet = this.getters.getMarketForOutcomeId(outcomeId).MarketType
        let self = this
        state.betPlacers = state.betPlacers.filter(betPlacer => {
            let marketTypeForThisBetPlacer = self.getters.getMarketForOutcomeId(betPlacer.outcomeId).MarketType
            return marketTypeForThisBet != marketTypeForThisBetPlacer
        })
    }
}