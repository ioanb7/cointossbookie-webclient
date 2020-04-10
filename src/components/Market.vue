<template>
    <div class="market" :class="{open: market.Status == 'Open', notOpen: market.Status != 'Open'}">
        <div>
            <header>
                <h3>
                    <span>{{this.market.MarketType}}</span>
                    &nbsp;
                    <span v-if="handicap">
                        (<strong>{{handicap}}</strong>)
                    </span>
                </h3>
            </header>

            <div class="outcomes">
                <Outcome v-for="outcome in market.Outcomes" :key="outcome.Id" :outcome="outcome" />
            </div>
        </div>
    </div>
</template>

<script>
    import Outcome from './Outcome.vue'
    import Score from './Score.vue'
    export default {
        props: {
            market: Object, // TODO: market type.
        },
        components: {
            Score,
            Outcome
        },
        computed: {
            handicap() {
                var handicap = this.market.Handicap.toFixed(2);

                if (parseInt(this.market.Handicap, 10).toFixed(2) == this.market.Handicap) {
                    handicap = this.market.Handicap.toFixed(0);
                } else {
                    if (handicap[handicap.length - 1] == "0") {
                        handicap = this.market.Handicap.toFixed(1);
                    }
                }

                if (handicap < 0.001) {
                    handicap = ""
                }
                return handicap
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outcomes,
    header {
        display: inline-block;
    }

    .notOpen {
        color: #ccc;

        a {
            color: #ccc;
        }
    }

    /*
    header {
        width: 80%;
        margin: 20px;
    }

    .market {
        padding: 10px;
    }

    h2 {
        vertical-align: middle;
        font-weight: 300;

        strong {
            font-weight: 600;
        }
    }*/
</style>