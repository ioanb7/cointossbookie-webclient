<template>
  <div>
    <ScoreBoard v-bind:id="this.GameId" v-bind:fixtureState="this.FixtureState" v-bind:items="this.Score" />
    <div :key="item.Id" v-for="item in this.Markets">
      <Market v-if="item.Status == 'Open'" v-bind:market="item" />
    </div>
  </div>
</template>

<script>
  import Market from './Market.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import axios from 'axios'
  import ReconnectingWebSocket from 'reconnecting-websocket';
  export default {
    name: "MainBetting",
    components: {
      ScoreBoard,
      Market
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
        //rws.send('hello!');
        console.log("open")
      });

      rws.addEventListener('error', () => {
        console.log("error")
        //rws.send('hello!');
      });

      rws.addEventListener('close', () => {
        console.log("close")
        //rws.send('hello!');
      });

      rws.addEventListener('message', (message) => {
        console.log("message")
        console.log(message)
        //rws.send('hello!');
        self.handleMessage(message)
      });

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>