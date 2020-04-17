<template>
  <div class="container-with-border m-auto">
    <div class="subContainer">
      <div v-if="isConnected">
        <div class="invitationToNextGame" v-if="invitationToNextGameIsDisplayed">
          <p>
            <a href="#" @click.prevent="joinNextGame"
              class="joinNextGame bg-red-700 p-5 inline-block w-full text-center hover:bg-teal-600">
              This game is finished now. Click here to join the next one.</a>
          </p>
        </div>
        <Game :gameId="currentGame.GameId" :markets="currentGame.Markets" :fixtureState="currentGame.FixtureState"
          :score="currentGame.Score" />
      </div>
      <div v-else>
        <p class="text-white p-12 text-center">
          <span v-if="connectionProgress < 5">Loading cointoss bookie..</span>
          <span v-else-if="connectionProgress < 10">Loading cointoss bookie takes longer than usual...</span>
          <span v-else>Cointoss bookie appears to be OFFLINE.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Game from './Game';
  import {
    mapGetters,
  } from 'vuex'

  export default {
    name: "MainBetting",
    components: {
      Game
    },
    data() {
      return {
        displayedGameId: null,
      }
    },
    computed: {
      ...mapGetters([
        'allGames',
        'latestGameId',
        'isConnected',
        'connectionProgress'
      ]),
      currentGame() {
        if (!this.latestGameId) {
          return {}
        }
        if (this.displayedGameId == null) {
          this.displayedGameId = this.latestGameId
        }
        let result = this.allGames[this.displayedGameId]
        return result
      },
      invitationToNextGameIsDisplayed() {
        return this.displayedGameId != this.latestGameId
      },
    },
    methods: {
      joinNextGame() {
        this.displayedGameId = this.latestGameId
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-with-border {
    max-width: 1024px;
    min-width: 300px;
  }

  @media screen and (min-width: 480px) {
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