export default {
    allGames(state) {
        return state.games
    },
    latestGameId(state) {
        return state.latestGameId
    },
    currentGame(state) {
        return state.games[state.latestGameId]
    },
    isConnected(state) {
        return state.isConnected
    },
    connectionProgress(state) {
        return state.connectionProgress
    },
}