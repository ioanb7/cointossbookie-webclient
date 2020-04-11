<template>
  <div v-if="hasLoaded">
    <div class="centered-container">
      <p v-if="invitationToNextGameIsDisplayed">
        <a href="#" @click.prevent="joinNextGame" class="nextGame">Want to join
          the next game?</a>
      </p>
      <Game :gameId="currentGame.GameId" :markets="currentGame.Markets" :fixtureState="currentGame.FixtureState"
        :score="currentGame.Score" />
    </div>
  </div>
  <p v-else>Loading...</p>
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
        dataForNextGame: null
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
  .centered-container {
    padding: 50px;
    font-weight: 400;
    font-family: 'Roboto Condensed', sans-serif; // TODO: body ?
  }
</style>