<template>
    <div class="scoreboard">
        <h1 class="title">Game <span class="game-id">{{this.id}}</span></h1>
        <div class="fixture-state">
            {{this.fixtureState}}
        </div>
        <div class="scores">
            <template v-for="item in this.items">
                <Score :key="item.id" v-bind:item="item.val" />
            </template>
        </div>
    </div>
</template>

<script>
    import Score from './Score.vue'
    export default {
        components: {
            Score
        },
        props: ["items", "id", "fixtureState"]
    }
</script>

<style lang="scss" scoped>
    * {
        margin: 0px;
        /* box-shadow: 0 0 black; */
        padding: 0px;
    }

    .scoreboard {
        padding-bottom: 20px;
        border: 1px solid #ccc;
        background-color: #48bb78;


        .fixture-state,
        .title {
            color: #f7fafc;
            font-size: 4.3em;
            text-align: center;
            font-weight: 800;
            text-transform: uppercase;
            line-height: 2.25em;
            letter-spacing: .05em;
            font-weight: 700;

            .game-id {
                font-size: 1.1em;
            }
        }

        .scores {
            text-align: center;

            &>* {
                padding-left: 5px;
            }
        }
    }
</style>