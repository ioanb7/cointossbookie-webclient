<template>
    <div class="market flex flex-no-wrap my-1"
        :class="{open: market.Status == 'Open', notOpen: market.Status != 'Open'}">
        <header class="bg-white">
            <h3 class="block px-3 py-1">
                <span>{{this.market.MarketType}}</span>
                &nbsp;
                <span v-if="handicap">
                    (<strong>{{handicap}}</strong>)
                </span>
            </h3>
        </header>

        <div class="outcomes">
            <Outcome v-for="outcome in market.Outcomes" :key="outcome.Id" :outcome="outcome"
                :isOutcomeStatusOpen="market.Status == 'Open'" />
        </div>
    </div>
</template>

<script>
    import Outcome from './Outcome.vue'
    import Score from './Score.vue'
    export default {
        props: {
            market: Object
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
    h3 {
        line-height: 4.5rem;
        height: 100%;
    }

    .notOpen {
        color: #ccc;

        a {
            color: #ccc;
        }
    }
</style>