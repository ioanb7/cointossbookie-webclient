<template>
  <div v-if="GameId != 0">
    <div class="centered-container">
      <ScoreBoard v-bind:id="GameId" v-bind:fixtureState="FixtureState" v-bind:items="Score" />
      <MarketFlipOnExactOrder class="marketOnExactOrder" :scoreSoFar="Score" v-if="marketOnExactOrderTrueProbability"
        :trueProbability="marketOnExactOrderTrueProbability" />
      <div class="markets" :key="item.Id" v-for="item in this.filteredMarkets">
        <Market v-bind:market="item" />
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import Market from './Market.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import ReconnectingWebSocket from 'reconnecting-websocket';
  import Convertor from '../helpers/convertor';

  var convertor = new Convertor();
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
        Score: []
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
        var self = this;

        const rws = new ReconnectingWebSocket('ws://localhost:7777/status');
        rws.binaryType = "arraybuffer";

        rws.addEventListener('open', () => {
          rws.send('hello!');
          console.log("WebSocket: open")
        });

        rws.addEventListener('error', () => {
          console.log("WebSocket: error")
        });

        rws.addEventListener('close', () => {
          console.log("WebSocket: close")
        });

        rws.addEventListener('message', (message) => {
          console.log("WebSocket: message")
          self.handleMessage(message)
        });
      },
      handleMessage(event) {
        var gameOutput = convertor.All(JSON.parse(event.data))

        this.Markets = gameOutput.Markets
        this.FixtureState = gameOutput.FixtureState
        this.Score = gameOutput.Score
        this.GameId = gameOutput.Id
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

  /*
  h3 {
    margin: 40px 0 0;
  }

  ul {
    padding: 0;
    list-style-type: none;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  */
</style>