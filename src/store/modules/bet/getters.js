export default {
    getWallet(state) {
        return +state.money.toFixed(2)
    },
    getBetsUids(state) {
        return state.bets.map((b) => b.uid);
    }
}