<template>
    <div class="outcome md-layout-item">
        <p>
            <a @click.prevent='isBetPlacerVisible = !isBetPlacerVisible' href="#">
                <b>{{outcomeName}}</b>
                &nbsp;
                {{price}}
            </a>
        </p>
        <BetPlacer v-if="isBetPlacerVisible" :price="price"></BetPlacer>
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
    //@import "vue-material/theme/engine";

    .betplacer {
        margin-bottom: 50px;
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