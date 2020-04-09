<template>
  <div v-if="hasLoaded">
    <div class="centered-container">
      <ScoreBoard :id="GameId" :fixtureState="FixtureState" :items="Score" />
      <MarketFlipOnExactOrder class="marketOnExactOrder" v-if="marketOnExactOrderTrueProbability" :scoreSoFar="Score"
        :trueProbability="marketOnExactOrderTrueProbability" :gameId="GameId" />
      <div class="marketGroups">
        <MarketGroup v-for="(marketGroup, index) in marketsToDisplayGrouped" :key="index" :marketType="index"
          :markets="marketGroup" />
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import MarketGroup from './MarketGroup.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import Networking from '../helpers/networking';
  import {
    groupBy
  } from '../helpers'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    name: "MainBetting",
    components: {
      ScoreBoard,
      MarketGroup,
      MarketFlipOnExactOrder
    },
    data() {
      return {
        GameId: 0,
        Markets: [],
        FixtureState: "",
        Score: [],
        update_id: 0
      }
    },
    created() {
      this.setUpWebSocket();
    },
    computed: {
      ...mapGetters([
        'getBetsUids'
      ]),
      hasLoaded() {
        return this.GameId != 0
      },
      marketsToDisplay() {
        return this.Markets.filter((item) => {
          return item.MarketType != 'Flip On Exact Order'
        })
      },
      marketsToDisplayGrouped() {
        const result = groupBy(this.marketsToDisplay, 'MarketType')
        return result
      },
      marketOnExactOrderTrueProbability() {
        let market = this.Markets.find((item) => {
          return item.Status == 'Open' && item.MarketType == 'Flip On Exact Order'
        })
        if (!market) {
          return 0
        }
        return market.Outcomes[0].TrueProbability
      }
    },
    methods: {
      ...mapMutations([
        'settledBets'
      ]),
      setUpWebSocket() {
        var networking = new Networking(this.update);
        networking.run()
      },
      update(data) {
        var bets = this.getBetsUids
        var settledMarkets = data.Markets.filter(m => m.Status == 'Settled')
        var settledOutcomes = settledMarkets.flatMap(m => m.Outcomes)
        var mySettledOutcomes = settledOutcomes.filter(o => bets.includes(o.Uid))
        if (mySettledOutcomes.length) {
          debugger; // eslint-disable-line
          var mySettledBets = mySettledOutcomes.map(o => ({
            uid: o.Uid,
            won: o.TrueProbability == 1.0
          }))
          this.settledBets(mySettledBets)
        }

        Object.assign(this.$data, data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .centered-container {
    padding: 50px;
    font-weight: 400;
    font-family: 'Roboto Condensed', sans-serif; // TODO: body ?
  }

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