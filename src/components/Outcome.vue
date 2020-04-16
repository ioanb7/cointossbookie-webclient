<template>
    <div class="outcome p-3 m-1" :class="{
        home: outcome.HostType=='Home',
        away: outcome.HostType=='Away',
        statusOpen: isOutcomeStatusOpen,
        statusNotOpen: !isOutcomeStatusOpen,
        'bg-white': isOutcomeStatusOpen}">
        <p>
            <a @click.prevent='toggleIsBetPlacerVisible' class="isBetPlacerVisibleTrigger" href="#">
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
        props: {
            "outcome": {
                type: Object,
                required: true
            },
            "isOutcomeStatusOpen": {
                type: Boolean,
                required: true
            }
        },
        components: {
            BetPlacer
        },
        data() {
            return {
                'isBetPlacerVisible': false
            }
        },
        watch: {
            isOutcomeStatusOpen(isOutcomeStatusOpen) {
                if (!isOutcomeStatusOpen) {
                    this.isBetPlacerVisible = false
                }
            }
        },
        computed: {
            price() {
                return this.outcome.TrueProbability * 0.95
            },
            outcomeName() { // TODO: move this logic out of here i think.
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
        },
        methods: {
            toggleIsBetPlacerVisible() {
                if (!this.isOutcomeStatusOpen) {
                    return;
                }

                this.isBetPlacerVisible = !this.isBetPlacerVisible
            }
        }
    }
</script>

<style lang="scss" scoped>
    a:visited,
    a:active,
    a:link {
        color: black;
    }

    a {
        text-decoration: none;
    }

    .outcomeName {
        text-decoration: underline;
    }

    .outcome {
        display: inline-block;
        margin-left: 35px;
    }

    .outcome.statusOpen {
        &:hover {
            background-color: blue; // blue by default (home)

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

    .statusNotOpen .outcomeName,
    .statusNotOpen .price {
        visibility: hidden;

        &:hover {}
    }

    .statusNotOpen a:hover {
        cursor: inherit
    }
</style>