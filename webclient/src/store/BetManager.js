export default class BetterCode {
    constructor(state) {
        this.state = state;
    }

    // PUBLIC
    placeBet({
        outcomeUid,
        betValue,
        winnings
    }) {
        this.state.money -= betValue;

        if (this.findBet(outcomeUid)) {
            this.addToBet(outcomeUid, winnings);
        } else {
            this.addBet(outcomeUid, winnings);
        }
    }

    addToBet(uid, winnings) {
        var bet = this.findBet(uid);
        bet.winnings += winnings;
    }

    addBet(uid, winnings) {
        this.state.bets.push({
            uid,
            winnings,
        });
    }

    findBet(uid) {
        return this.state.bets.find((b) => b.outcomeUid == uid);
    }

    // PUBLIC
    settledBets(payload) {
        payload.forEach(this.settleBet);
    }

    settleBet({
        uid,
        won
    }) {
        if (won) {
            this.settleBetWin(uid);
        }

        this.deleteBet(uid);
    }

    settleBetWin(uid) {
        var bet = this.findBet(uid);
        if (!bet) {
            console.error(`Couldn't settle bet {uid}`)
            return;
        }

        this.state.money += bet.winnings;
    }

    deleteBet(uid) {
        this.state.bets = this.state.bets.filter((b) => b.outcomeUid != uid);
    }
}