<template>
    <div class="market">
        <div class="md-layout md-gutter">
            <header>
                <h2>
                    <span>{{this.market.MarketType}}</span>
                    &nbsp;
                    <span v-if="handicap">
                        (<strong>{{handicap}}</strong>)
                    </span>
                </h2>
            </header>
            <div class="selectionsOrder">
                <template v-for="item in hostTypes">
                    <Score :key="item.id" v-bind:item="item.val" />
                </template>
            </div>

            <div class="outcomes">
                <template v-for="outcome in market.Outcomes">
                    <Outcome :key="outcome.Id" v-bind:outcome="outcome" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Outcome from './Outcome.vue'
    import Score from './Score.vue'
    export default {
        props: ["market"],
        components: {
            Score,
            Outcome
        },
        computed: {
            hostTypes() {
                return this.market.HostTypes.map((val, i) => {
                    return {
                        'id': i,
                        'val': val
                    }
                })
            },
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
    }
</style>