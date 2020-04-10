<template>
    <div class="betplacer">
        <p>
            <input type="text" v-model="betValue" label="How much would you like to bet?" />
            <b>io</b>
        </p>
        <ul class='suggestedBetValues'>
            <template>
                <li v-for="suggestedBetValue in suggestedBetValues" :key="suggestedBetValue">
                    <a href="#" @click.prevent='betValue = suggestedBetValue'>{{suggestedBetValue}}</a>
                </li>
            </template>
        </ul>
        <p>Estimated winnings: <span class="estimated-winnings">{{winnings}}</span><b>io</b></p>
        <p><a @click.prevent='placeMyBet' class="placeMyBet" href="#">Bet</a></p>
        <p v-if='placed'>Placed!</p>
    </div>
</template>

<script>
    // TODO: rename css classes in the entire project to use the suggested standard format
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
            placeableBetValues() {
                return this.suggestedBetValues.filter(x => this.canPlaceBet(x))
            },
            winnings() {
                if (!this.betValue || this.betValue < 0) {
                    return 0.0.toFixed(2)
                }
                var bet = parseFloat(this.betValue)
                var price = this.price
                var winnings = bet + bet * price
                //if (isNaN(winnings)) {
                //    return 0.0.toFixed(2)
                //}
                return winnings.toFixed(2)
            }
        },
        methods: {
            ...mapMutations([
                'placeBet'
            ]),
            placeMyBet() {
                this.placeBet({
                    uid: this.outcomeUid,
                    betValue: this.betValue,
                    winnings: parseFloat(this.winnings)
                })
                this.placed = true
                this.betValue = ''
            },
            canPlaceBet(betValue) {
                return betValue <= this.getWallet && betValue > 0
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