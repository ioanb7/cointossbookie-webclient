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
        <p><a @click.prevent='placeBet' href="#">Bet</a></p>
        <p v-if='placed'>Placed!</p>
    </div>
</template>

<script>
    export default {
        props: ["price", "wallet"],
        data() {
            return {
                'betValue': 0,
                'placed': false
            }
        },
        computed: {
            suggestedBetValues: function () {
                var self = this;
                return [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000].filter((val) => self.wallet.get() >= val)
            },
            winnings: function () {
                var bet = parseFloat(this.betValue)
                var price = this.price
                var winnings = bet + bet * price
                return winnings.toFixed(2)
            }
        },
        methods: {
            placeBet: function () {
                this.placed = true;
                this.betValue = 0;
            },
            canPlaceBet: function (bet) {
                return bet < 500;
            },
            focused: () => {
                /*
                if (this.betValue == "0") {
                    this.betValue = ''
                }*/
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