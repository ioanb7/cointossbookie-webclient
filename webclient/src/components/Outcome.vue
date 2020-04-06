<template>
    <div class="outcome" :class="{home: outcome.HostType=='Home', away: outcome.HostType=='Away'}">
        <p>
            <a @click.prevent='isBetPlacerVisible = !isBetPlacerVisible' href="#">
                <b class="outcomeName">{{outcomeName}}</b>
                <span class="price">{{price}}</span>
            </a>
        </p>
        <BetPlacer v-if="isBetPlacerVisible" :price="price" :outcomeUid="outcome.Uid"></BetPlacer>
    </div>
</template>

<script>
    import BetPlacer from './BetPlacer.vue'
    export default {
        props: ["outcome"],
        components: {
            BetPlacer
        },
        data() {
            return {
                'isBetPlacerVisible': false
            }
        },
        computed: {
            price() {
                return this.outcome.TrueProbability * 1.05
            },
            outcomeName() {
                var hostType = this.outcome.HostType
                var result = this.outcome.HostType
                switch (this.outcome.OutcomeType) {
                    case "Yes / No":
                        result = "Yes"
                        if (hostType == "Away") {
                            result = "No"
                        }
                        break;
                    case "Over / Under":
                        result = "Over"
                        if (hostType == "Away") {
                            result = "Under"
                        }
                }
                return result
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outcome {
        display: inline-block;
        margin-left: 35px;

        &:hover {
            background-color: blue; // blue by default (home)
            border-radius: 30px 0px;

            &.away {
                background-color: green; // todo: change colors
            }
        }
    }

    .betplacer {
        margin-bottom: 50px;
    }

    .outcomeName,
    .price {
        display: block;
        text-align: center;
        padding: 0px 10px;

    }

    .md-layout-item {

        &:after {
            width: 100%;
            height: 100%;
            display: block;
            background: md-get-palette-color(red, 200);
            content: " ";
        }
    }
</style>