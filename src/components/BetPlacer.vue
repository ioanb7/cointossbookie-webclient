<template>
    <div class="betplacer">
        <template v-if="!placed">
            <OutcomeName :outcome="outcome" />
            <p>
                <input type="text" v-model="betValue" label="How much would you like to bet?" />
                <b>io</b>
            </p>
            <ul class='suggestedBetValues'>
                <template>
                    <li v-for="suggestedBetValue in placeableBetValues" :key="suggestedBetValue">
                        <a href="#" @click.prevent='betValue = suggestedBetValue'>{{suggestedBetValue}}</a>
                    </li>
                </template>
            </ul>
            <p>Estimated winnings: <span class="estimated-winnings">{{winnings}}</span><b>io</b></p>
            <p><a @click.prevent='placeMyBet' class="placeMyBet" href="#">Bet</a></p>
        </template>
        <p v-if='placed'>Placed! Potential winnings {{placedPotentialWinnings}}io <a href="#"
                @click.prevent="exit">Exit</a></p>
    </div>
</template>

<script>
    import OutcomeName from './OutcomeName'
    // TODO: rename css classes in the entire project to use the suggested standard format
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    export default {
        name: 'BetPlacer',
        components: {
            OutcomeName
        },
        props: {
            price: Number,
            outcomeUid: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                betValue: '',
                placed: false,
                placedPotentialWinnings: 0
            }
        },
        computed: {
            ...mapGetters([
                'getWallet',
                'currentGame'
            ]),
            placeableBetValues() {
                var suggestedBetValues = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]
                return suggestedBetValues.filter(x => this.canPlaceBet(x))
            },
            winnings() {
                if (!this.betValue || this.betValue < 0) {
                    return 0.0.toFixed(2)
                }
                var bet = parseFloat(this.betValue)
                var price = this.price
                var winnings = bet + bet * price
                return winnings.toFixed(2)
            },
            outcome() {
                let outcome = null
                let outcomeId = this.outcomeUid
                this.currentGame.Markets.forEach(market => {
                    market.Outcomes.forEach(outcomeX => {
                        if (outcomeX.Uid == outcomeId) {
                            outcome = outcomeX
                        }
                    });
                });
                return outcome
            }
        },
        methods: {
            ...mapMutations([
                'placeBet',
                'cancelBetPlacer'
            ]),
            placeMyBet() {
                this.placeBet({
                    uid: this.outcomeUid,
                    betValue: this.betValue,
                    winnings: parseFloat(this.winnings)
                })
                this.placed = true
                this.placedPotentialWinnings = parseFloat(this.winnings)
                this.betValue = ''
            },
            canPlaceBet(betValue) {
                return betValue <= this.getWallet && betValue > 0
            },
            exit() {
                this.cancelBetPlacer(this.outcomeUid)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .betplacer {
        border: 1px solid #ccc;
        background-color: white;
        padding: 30px;
    }
</style>