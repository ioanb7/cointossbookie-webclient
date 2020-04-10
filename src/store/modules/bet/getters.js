export default {
    getWallet(state) {
        return state.money;
    },
    getBetsUids(state) {
        return state.bets.map((b) => b.uid);
    }
}