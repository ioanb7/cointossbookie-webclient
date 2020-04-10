function addToBet(state, uid, winnings) {
    var bet = findBet(state, uid);
    bet.winnings += winnings;
}

function addBet(state, uid, winnings) {
    state.bets.push({
        uid,
        winnings,
    });
}

function findBet(state, uid) {
    return state.bets.find((b) => b.uid == uid);
}

function settleBet(state, {
    uid,
    won
}) {
    if (won) {
        settleBetWin(state, uid);
    }

    deleteBet(state, uid);
}

function settleBetWin(state, uid) {
    var bet = findBet(state, uid);
    if (!bet) {
        // TODO: proper logging for this so it doesn't show in the jest output when testing as though it's an error.
        //console.error(`Couldn't settle bet ${uid}`)
        return;
    }
    
    state.money += bet.winnings;
}

function deleteBet(state, uid) {
    state.bets = state.bets.filter((b) => b.uid != uid);
}

export default {
    placeBet (state, {
        uid,
        betValue,
        winnings
        }) {
        state.money -= betValue;

        if (findBet(state, uid)) {
            addToBet(state, uid, winnings);
        } else {
            addBet(state, uid, winnings);
        }
    },
    settledBets(state, payload) {
        payload.forEach((b) => settleBet(state, b));
    }
}