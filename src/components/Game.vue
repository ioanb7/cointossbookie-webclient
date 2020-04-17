<template>
  <div class="game">
    <Header :id="gameId" :fixtureState="fixtureState" :items="score" />
    <div class="marketGroups flex flex-wrap justify-center p-2 sm:p-0">
      <MarketGroup v-for="(marketGroup, index) in marketsToDisplayGrouped" :key="index" :marketType="index"
        :markets="marketGroup" />
      <MarketFlipOnExactOrder v-if="marketOnExactOrderTrueProbability" :scoreSoFar="score"
        :trueProbability="marketOnExactOrderTrueProbability" :gameId="gameId" />
    </div>
  </div>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import MarketGroup from './MarketGroup.vue'
  import Header from './Header.vue'
  import {
    groupBy
  } from '../helpers'

  export default {
    name: "Game",
    components: {
      Header,
      MarketGroup,
      MarketFlipOnExactOrder
    },
    props: {
      gameId: Number,
      markets: Array,
      fixtureState: String,
      score: Array
    },
    computed: {
      marketsToDisplay() {
        return this.markets.filter((item) => {
          return item.MarketType != 'Flip On Exact Order'
        })
      },
      marketsToDisplayGrouped() {
        return groupBy(this.marketsToDisplay, 'MarketType')
      },
      marketOnExactOrderTrueProbability() {
        let market = this.markets.find((item) => {
          return item.Status == 'Open' && item.MarketType == 'Flip On Exact Order'
        })
        if (!market) {
          return 0
        }
        return market.Outcomes[0].TrueProbability
      }
    }
  }
</script>

<style lang="scss" scoped>
  .marketOnExactOrder {
    padding: 30px;
    margin: 0 auto;
  }

  .market:nth-child(odd) {
    background-color: #4299e1;
  }
</style>