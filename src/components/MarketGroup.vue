<template>
    <div class="marketGroup sm:p-4 sm:m-4 mb-20">
        <header class="bg-white w-full px-3 p-1">
            <h2>{{marketType}}</h2>
        </header>

        <div class="markets">
            <Market v-for="market in this.markets" :key="market.Id" :market="market"></Market>
        </div>

        <BetPlacer v-if="betPlacer != null" :price="betPlacer.price" :outcomeUid="betPlacer.outcomeId"></BetPlacer>
        <p v-else class="font-hairline text-sm mt-10">Note: Click on any selection to bet</p>
    </div>
</template>

<script>
    import BetPlacer from './BetPlacer.vue'
    import Market from './Market.vue'
    import {
        mapGetters
    } from 'vuex'
    export default {
        components: {
            Market,
            BetPlacer
        },
        props: ["markets", "marketType"],
        computed: {
            ...mapGetters(['allBetPlacers']),
            betPlacer() {
                return this.findBetPlacerForThisMarketType(this.allBetPlacers)
            }
        },
        methods: {
            findBetPlacerForThisMarketType(allBetPlacers) {
                var result = allBetPlacers.find(betPlacer => betPlacer.marketType == this.marketType)
                return result
            }
        }
    }
</script>

<style lang="scss">
    .marketGroup {
        min-width: 375px;
        justify-content: space-between;

        header {
            display: inline-block;
        }
    }
</style>