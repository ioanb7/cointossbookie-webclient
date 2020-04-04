<template>
    <div class="marketOnExactOrder" v-if="canChange(3)">
        <header>
            <h2>
                <b>EXACT POSITION</b>
            </h2>
        </header>
        <div class=" selectionsOrder">
            <template v-for="item in hostTypes">
                <Score :key="item.id" v-bind:item="item.val"
                    :class="{canNotChange: !canChange(item.id), canChange: canChange(item.id)}"
                    @click="flip(item.id)" />
            </template>
        </div>
        <p><i>Note: Click on the image to toggle</i></p>
        <p>
            <a @click.prevent='isBetPlacerVisible = !isBetPlacerVisible' href="#">
                Place bet ?
            </a>
        </p>
        <BetPlacer v-if="isBetPlacerVisible" :price="trueProbability" />
    </div>
</template>

<script>
    import BetPlacer from './BetPlacer.vue'
    import Score from './Score.vue'
    export default {
        props: ["scoreSoFar", "trueProbability"],
        components: {
            Score,
            BetPlacer
        },
        watch: {
            scoreSoFar: function (scoreSoFarNew) {
                var self = this;
                scoreSoFarNew.forEach((score) => {
                    var localScore = self.hostTypes.find((elem) => elem.id == score.id);
                    if (!localScore) {
                        console.error("Couldn't find local store.");
                        return;
                    }

                    localScore.canChange = score.val == 'None';
                    if (score.val != 'None') {
                        localScore.val = score.val;
                    }
                })
            }
        },
        data: function () {
            return {
                'hostTypes': this.initialHostTypesValues(
                    this.scoreSoFar.filter((s) => s.val != 'None').map((s) => s.val)
                ),
                isBetPlacerVisible: false
            }
        },
        methods: {
            initialHostTypesValues: function (initialValues) {
                const initialValuesLength = initialValues.length
                initialValues = initialValues.concat(['Home', 'Away', 'Home', 'Away', 'Home'])
                initialValues = initialValues.slice(0, 5)
                initialValues = initialValues.map((val, i) => {
                    return {
                        'id': i,
                        'val': val,
                        'canChange': i > initialValuesLength - 1
                    }
                });
                return initialValues
            },
            canChange: function (position) {
                var localScore = this.hostTypes.find((elem) => elem.id == position);
                if (!localScore) {
                    console.error("Couldn't find local store.");
                    return;
                }
                return localScore.canChange
            },
            flip: function (position) {
                this.hostTypes.forEach((item) => {
                    if (item.id == position && item.canChange) {
                        let currentValue = item.val
                        var newValue = 'Home'
                        if (currentValue == newValue) {
                            newValue = 'Away'
                        }
                        item.val = newValue

                        return true;
                    }
                    return false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .marketOnExactOrder {
        width: 360px;

        h2,
        .selectionsOrder,
        p {
            margin: 0 auto;
            text-align: center;
            margin-bottom: 15px;
        }
    }

    .canNotChange {
        border: 1px solid black;
    }

    .canChange {
        cursor: pointer;
    }
</style>