<template>
    <div class="betplacer">
        <p>
            <input type="text" v-model="betValue" label="How much would you like to bet?" @focus="focused" />
            <b>io</b>
        </p>
        <ul class='suggestedBetValues'>
            <template v-for="suggestedBetValue in suggestedBetValues">
                <li :key="suggestedBetValue" v-if="canPlaceBet(suggestedBetValue)">
                    <a href="#" @click.prevent='betValue = suggestedBetValue'>{{suggestedBetValue}}</a>
                </li>
            </template>
        </ul>
        <p>Estimated winnings: {{winnings}} <b>io</b></p>
        <p><a @click.prevent='placeMyBet' href="#">Bet</a></p>
        <p v-if='placed'>Placed!</p>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    export default {
        props: {
            price: Number,
            outcomeUid: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                'betValue': '',
                'placed': false
            }
        },
        computed: {
            ...mapGetters([
                'getWallet'
            ]),
            suggestedBetValues() {
                return [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]
            },
            winnings() {
                if (!this.betValue || this.betValue < 0) {
                    return 0.0.toFixed(2)
                }
                var bet = parseFloat(this.betValue)
                var price = this.price
                var winnings = bet + bet * price
                if (isNaN(winnings)) {
                    return 0.0.toFixed(2)
                }
                return winnings.toFixed(2)
            }
        },
        methods: {
            ...mapMutations([
                'placeBet'
            ]),
            placeMyBet() {
                this.placeBet({
                    outcomeUid: this.outcomeUid,
                    betValue: this.betValue,
                    winnings: parseFloat(this.winnings)
                })
                this.placed = true;
                this.betValue = 0;
            },
            canPlaceBet(bet) {
                return bet <= this.getWallet && bet > 0;
            },
            focused() {
                if (this.betValue == "0") {
                    this.betValue = ''
                }
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