<template>
  <div class="game">
    <ScoreBoard :id="gameId" :fixtureState="fixtureState" :items="score" />
    <MarketFlipOnExactOrder class="marketOnExactOrder" v-if="marketOnExactOrderTrueProbability" :scoreSoFar="score"
      :trueProbability="marketOnExactOrderTrueProbability" :gameId="gameId" />
    <div class="marketGroups">
      <MarketGroup v-for="(marketGroup, index) in marketsToDisplayGrouped" :key="index" :marketType="index"
        :markets="marketGroup" />
    </div>
  </div>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import MarketGroup from './MarketGroup.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import {
    groupBy
  } from '../helpers'

  export default {
    name: "Game",
    components: {
      ScoreBoard,
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
  // TODO: change this
  .marketGroups {
    height: 1000px;
  }

  .marketOnExactOrder {
    padding: 30px;
    margin: 0 auto;
  }

  .market:nth-child(odd) {
    background-color: #4299e1;
  }
</style>