<template>
    <div class="market">
        <header>
            <b>{{this.market.MarketType}}</b>
            <span v-if="getHandicap() != ''">({{getHandicap()}})</span>
        </header>
        <div className="order">
            <div :key="item.id" v-for="item in this.getHostTypes()">
                <b v-if="item.val == 'Home'">
                    <i>
                        <Score v-bind:item="item.val" />
                    </i>
                </b>
                <Score v-else v-bind:item="item.val" />
            </div>
        </div>

        <div className="outcomes">
            <div :key="outcome.Id" v-for="outcome in this.market.Outcomes">
                <Outcome v-bind:outcome="outcome" />
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
        methods: {
            getHostTypes() {
                return this.market.HostTypes.map((val, i) => {
                    return {
                        'id': i,
                        'val': val
                    }
                })
            },
            getHandicap() {
                var m = this.market
                var handicap = m.Handicap.toFixed(2);

                if (parseInt(m.Handicap, 10).toFixed(2) == m.Handicap) {
                    handicap = m.Handicap.toFixed(0);
                } else {
                    if (handicap[handicap.length - 1] == "0") {
                        handicap = m.Handicap.toFixed(1);
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