<template>
  <div class="centered-container">
    <ScoreBoard v-bind:id="GameId" v-bind:fixtureState="FixtureState" v-bind:items="Score" />
    <MarketFlipOnExactOrder class="marketOnExactOrder" :scoreSoFar="Score" v-if="marketOnExactOrderTrueProbability"
      :trueProbability="marketOnExactOrderTrueProbability" />
    <div class="markets" :key="item.Id" v-for="item in this.filteredMarkets">
      <Market v-bind:market="item" />
    </div>
  </div>
</template>

<script>
  import MarketFlipOnExactOrder from './MarketFlipOnExactOrder.vue'
  import Market from './Market.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import axios from 'axios'
  import ReconnectingWebSocket from 'reconnecting-websocket';
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
      this.getDataFromApi()
      var self = this;

      const rws = new ReconnectingWebSocket('ws://localhost:7777/status');
      rws.binaryType = "arraybuffer";

      rws.addEventListener('open', () => {
        rws.send('hello!');
        console.log("open")
      });

      rws.addEventListener('error', () => {
        console.log("error")
      });

      rws.addEventListener('close', () => {
        console.log("close")
      });

      rws.addEventListener('message', (message) => {
        console.log("message")
        console.log(message)
        self.handleMessage(message)
      });
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
      getDataFromApi() {
        this.loading = true
        axios.get('/sampleinput.json')
          .then(response => {
            this.Markets = response.data.Markets
            this.FixtureState = response.data.FixtureState
            this.Score = response.data.Score.map((val, i) => {
              return {
                'id': i,
                'val': val
              }
            })
          })
          .catch(error => {
            console.log(error)
          })
      },

      marketType(marketTypeId) {
        return [
          "Home Win Over Under",
          "Flip",
          "Flip On Exact Position",
          "Flip On Exact Order"
        ][marketTypeId]
      },
      outcomeType(outcomeTypeId) {
        return [
          "Home / Away",
          "Yes / No",
          "Over / Under"
        ][outcomeTypeId]

      },
      marketStatus(marketStatusId) {
        return [
          "Open",
          "Suspended",
          "Hidden",
          "Settled"
        ][marketStatusId]
      },

      hostType(hostTypeId) {
        return [
          "None",
          "Home",
          "Away"
        ][hostTypeId]
      },

      fixtureState(fixtureStateId) {
        return [
          "Pre Match",
          "In Play",
          "Finished"
        ][fixtureStateId]
      },

      handleMessage(event) {

        const gameOutput = JSON.parse(event.data);
        var self = this;
        gameOutput.Markets = gameOutput.Markets.map(function (m) {
          var outcomes = m.Outcomes.map(function (o) {
            return {
              TrueProbability: o.TrueProbability,
              HostType: self.hostType(o.HostType),
              OutcomeType: self.outcomeType(o.OutcomeType)
            };
          });

          var hostTypes = m.HostTypes.map(function (h) {
            return self.hostType(h)
          });

          return {
            Id: m.Id,
            MarketType: self.marketType(m.MarketType),
            Handicap: m.Handicap,
            Outcomes: outcomes,
            Status: self.marketStatus(m.Status),
            HostTypes: hostTypes
          };
        });
        gameOutput.Score = gameOutput.Score.map(function (h) {
          return self.hostType(h)
        });
        gameOutput.FixtureState = self.fixtureState(gameOutput.FixtureState)


        this.Markets = gameOutput.Markets
        this.FixtureState = gameOutput.FixtureState
        this.GameId = gameOutput.Id
        this.Score = gameOutput.Score.map((val, i) => {
          return {
            'id': i,
            'val': val
          }
        })
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