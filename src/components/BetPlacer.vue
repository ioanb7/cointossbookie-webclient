<template>
    <div class="betplacer relative">
        <template v-if="!placed">
            <OutcomeName :outcome="outcome" />
            <a href="#" @click.prevent="exit" class="exit absolute top-0 right-0 m-6">
                <svg class="w-6 h-6 fill-current text-gray-600" viewBox="0 0 20 20" enable-background="new 0 0 20 20">
                    <path d="M14.348,14.849c-0.469,0.469-1.229,0.469-1.697,0L10,11.819l-2.651,3.029c-0.469,0.469-1.229,0.469-1.697,0
                        c-0.469-0.469-0.469-1.229,0-1.697l2.758-3.15L5.651,6.849c-0.469-0.469-0.469-1.228,0-1.697s1.228-0.469,1.697,0L10,8.183
                        l2.651-3.031c0.469-0.469,1.228-0.469,1.697,0s0.469,1.229,0,1.697l-2.758,3.152l2.758,3.15
                        C14.817,13.62,14.817,14.38,14.348,14.849z"
                        :style="{transform: 'scale(1.8) translate(-4px, -4px)'}" />
                </svg>
            </a>
            <div class="mt-10">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="betValue">
                    Bet value:
                </label>
                <input type="text" v-model="betValue" id="betValue" label="How much would you like to bet?" class="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight
                focus:outline-none focus:shadow-outline" placeholder="2" />
                <b class="mx-2">io</b>
            </div>
            <ul class="suggestedBetValues inline-block flex flex-wrap mt-4">
                <template>
                    <li v-for="suggestedBetValue in placeableBetValues" :key="suggestedBetValue"
                        class="inline-block rounded-lg bg-gray-500 text-xs mr-2 mb-2 min-w-1/4">
                        <a href="#" @click.prevent='betValue = suggestedBetValue'
                            class="w-full inline-block text-center p-1">{{suggestedBetValue}}</a>
                    </li>
                </template>
            </ul>
            <p>Estimated winnings: <span class="estimated-winnings">{{winnings}}</span><b>io</b></p>
            <p class="px-4 pl-0 pr-6">
                <a @click.prevent='placeMyBet' class="placeMyBet inline-block p-4 px-6 my-4 mt-10 border hover:bg-gray-400 hover:text-white w-full
                    " href="#">
                    Bet
                </a>
            </p>
        </template>
        <p v-if='placed'>Placed! Potential winnings {{placedPotentialWinnings}}io</p>
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