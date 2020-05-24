export default {
    allGames(state) {
        return state.games
    },
    latestGameId(state) {
        return state.latestGameId
    },
    // Note: used in getMarketForOutcomeId as well.
    currentGame(state) {
        return state.games[state.latestGameId]
    },
    isConnected(state) {
        return state.isConnected
    },
    connectionProgress(state) {
        return state.connectionProgress
    },
    getMarketForOutcomeId(state) {
        return ((outcomeId) => {
            let marketFound = null
            const currentGame = state.games[state.latestGameId]

            currentGame.Markets.forEach(market => {
                market.Outcomes.forEach(outcome => {
                    if (outcome.Uid == outcomeId) {
                        marketFound = market
                    }
                });
            });
            return marketFound
        }).bind(state)
    }
}