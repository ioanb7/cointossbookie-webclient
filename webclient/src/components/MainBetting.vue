<template>
  <div v-if="GameId != 0">
    <div class="centered-container">
      <ScoreBoard v-bind:id="GameId" v-bind:fixtureState="FixtureState" v-bind:items="Score" />
      <MarketFlipOnExactOrder class="marketOnExactOrder" v-if="marketOnExactOrderTrueProbability" :scoreSoFar="Score"
        :trueProbability="marketOnExactOrderTrueProbability" :wallet="Wallet" />
      <div class="markets" :key="item.Id" v-for="item in this.filteredMarkets">
        <Market v-bind:market="item" :wallet="Wallet" />
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import Market from './Market.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import Wallet from '../helpers/wallet';
  import Networking from '../helpers/networking';

  export default {
    name: "MainBetting",
    components: {
      ScoreBoard,
      Market,
      MarketFlipOnExactOrder
    },
    data() {
      var wallet = new Wallet();

      return {
        GameId: 0,
        Markets: [],
        FixtureState: "",
        Score: [],
        Wallet: wallet
      }
    },
    created() {
      this.setUpWebSocket();
    },
    computed: {
      filteredMarkets: function () {
        return this.Markets.filter((item) => {
          return item.Status == 'Open' && item.MarketType != 'Flip On Exact Order'
        })
      },
      marketOnExactOrderTrueProbability: function () {
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
      setUpWebSocket() {
        var networking = new Networking((data) => {
          Object.assign(this.$data, data)
        });
        networking.run()
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