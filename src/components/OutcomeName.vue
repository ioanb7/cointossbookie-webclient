<template>
    <span>{{outcomeName}}</span>
</template>

<script>
    export default {
        name: 'OutcomeName',
        props: {
            "outcome": {
                type: Object,
                required: false
            },
        },
        computed: {
            outcomeName() {
                if (this.outcome == null) {
                    return "MISSING_OUTCOME"
                }

                var hostType = this.outcome.HostType
                var result = this.outcome.HostType
                switch (this.outcome.OutcomeType) {
                    case "Yes / No":
                        if (hostType == "Away") {
                            result = "No"
                        } else if (hostType == "Home") {
                            result = "Yes"
                        } else {
                            throw `Invalid host type ${hostType}`
                        }
                        break;
                    case "Over / Under":
                        if (hostType == "Away") {
                            result = "Under"
                        } else if (hostType == "Home") {
                            result = "Over"
                        } else {
                            throw `Invalid host type ${hostType}`
                        }
                }
                return result
            }
        },
    }
</script>