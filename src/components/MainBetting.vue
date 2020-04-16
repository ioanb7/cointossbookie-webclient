<template>
  <div class="container-with-border m-auto">
    <div class="subContainer">
      <div v-if="hasLoaded">
        <div class="invitationToNextGame" v-if="invitationToNextGameIsDisplayed">
          <p>
            <a href="#" @click.prevent="joinNextGame"
              class="bg-red-700 p-5 inline-block w-full text-center hover:bg-teal-600">
              This game is finished now. Click here to join the next one.</a>
          </p>
        </div>
        <Game :gameId="currentGame.GameId" :markets="currentGame.Markets" :fixtureState="currentGame.FixtureState"
          :score="currentGame.Score" />

      </div>
      <div v-else>
        <p class="text-white p-12 text-center">
          <span v-if="loading_timer < 5">Loading cointoss bookie..</span>
          <span v-else-if="loading_timer < 10">Loading cointoss bookie takes longer than usual...</span>
          <span v-else>Cointoss bookie appears to be OFFLINE.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Networking from '../helpers/networking';
  import Game from './Game';
  import {
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    name: "MainBetting",
    components: {
      Game
    },
    data() {
      return {
        currentGame: {},
        invitationToNextGameIsDisplayed: false,
        dataForNextGame: null,
        loading_timer: 0,
        loading_interval: null
      }
    },
    created() {
      this.setUpWebSocket();

      var self = this;
      this.loading_timer = 0
      this.loading_interval = setInterval(function () {
        self.loading_timer++
      }, 1000)
    },
    computed: {
      ...mapGetters([
        'getBetsUids'
      ]),
      hasLoaded() {
        return this.currentGame.GameId !== undefined
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
      update(data) { // TODO: move this out of here into a store (dif than the wallet one).
        if (this.loading_interval !== null) {
          clearInterval(this.loading_interval)
          this.loading_interval = null
          this.loading_timer = 0
        }

        var bets = this.getBetsUids
        var settledMarkets = data.Markets.filter(m => m.Status == 'Settled')
        var settledOutcomes = settledMarkets.flatMap(m => m.Outcomes)
        var mySettledOutcomes = settledOutcomes.filter(o => bets.includes(o.Uid))
        if (mySettledOutcomes.length) {
          var mySettledBets = mySettledOutcomes.map(o => ({
            uid: o.Uid,
            won: o.TrueProbability == 1.0
          }))
          this.settledBets(mySettledBets)
        }

        if (data.GameId != this.currentGame.GameId && this.currentGame.GameId !== undefined) {
          this.invitationToNextGameIsDisplayed = true
          this.dataForNextGame = data
        } else {
          /*
          this.currentGame.Markets = data.Markets
          this.currentGame.GameId = data.GameId
          this.currentGame.FixtureState = data.FixtureState
          this.currentGame.Score = data.Score*/
          this.currentGame = {} // without this, tests fail
          Object.assign(this.currentGame, data)
        }
      },
      joinNextGame() {
        this.invitationToNextGameIsDisplayed = false
        this.currentGame = this.dataForNextGame
        this.dataForNextGame = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-with-border {
    max-width: 1024px;
    min-width: 300px;
  }

  @media screen and (min-width: 360px) {
    .container-with-border {
      border-top: 30px solid #fbab7f;
      border-bottom: 30px solid #fbab7f;

      background-color: #FDCBB0;

      .subContainer {
        background-color: #389bb2; // #202225;
        margin-left: 30px;
        margin-right: 30px;
      }
    }
  }

  .invitationToNextGame {
    color: white;
  }
</style>