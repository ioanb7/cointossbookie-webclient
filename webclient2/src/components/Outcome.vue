<template>
    <div class="outcome">
        <a href="#">
            <p><b>{{this.getOutcomeName()}}</b></p>
            <p>{{this.getPrice()}}</p>
        </a>
        <BetPlacer></BetPlacer>
    </div>
</template>

<script>
    import BetPlacer from './BetPlacer.vue'
    export default {
        props: ["outcome"],
        components: {
            BetPlacer
        },
        methods: {
            getPrice() {
                return this.outcome.TrueProbability * 1.05
            },
            getOutcomeName() {
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