<template>
  <div v-if="hasLoaded">
    <div class="centered-container">
      <ScoreBoard :id="GameId" :fixtureState="FixtureState" :items="Score" />
      <MarketFlipOnExactOrder class="marketOnExactOrder" v-if="marketOnExactOrderTrueProbability" :scoreSoFar="Score"
        :trueProbability="marketOnExactOrderTrueProbability" :gameId="GameId" />
      <div class="markets" :key="market.Id" v-for="market in this.marketsToDisplay">
        <Market :market="market"></Market>
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import Market from './Market.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import Networking from '../helpers/networking';
  import {
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    name: "MainBetting",
    components: {
      ScoreBoard,
      Market,
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
          return item.Status == 'Open' && item.MarketType != 'Flip On Exact Order'
        })
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

<style scoped>
  .centered-container {
    padding: 50px;
  }

  .marketOnExactOrder {
    padding: 30px;
    margin: 0 auto;
  }

  .markets:nth-child(odd) {
    background-color: #4299e1;
  }
</style>