<template>
    <keep-alive>
        <div class="marketGroup sm:p-4 sm:m-4 mb-20" v-if="canChange(3)">
            <header class="bg-white w-full p-1 px-3">
                <h2>Exact Order</h2>
            </header>
            <div class="selectionsOrder my-5">
                <Score v-for="item in hostTypes" :key="item.id" :item="item.val" :class="{
                        canNotChange: !canChange(item.id),
                        canChange: canChange(item.id),
                        'bg-white': canChange(item.id)}" @click.native="flip(item.id)" />
            </div>
            <p class="font-hairline text-sm">Note: Click on the image to toggle</p>
            <p class="block my-4 mt-10">
                <a class="bg-white p-4" @click.prevent='isBetPlacerVisible = !isBetPlacerVisible' href="#">
                    Place bet ?
                </a>
            </p>
            <BetPlacer v-if="isBetPlacerVisible" :price="trueProbability" :outcomeUid=outcomeUid />
        </div>
    </keep-alive>
</template>

<script>
    import {
        ExactOrderMarket
    } from '../helpers/outcomeUidGenerator'

    import BetPlacer from './BetPlacer.vue'
    import Score from './Score.vue'
    export default {
        props: {
            scoreSoFar: {
                type: Array,
                required: true
            },
            trueProbability: {
                type: Number,
                required: true
            },
            gameId: {
                type: Number,
                required: true
            }
        },
        components: {
            Score,
            BetPlacer
        },
        watch: {
            scoreSoFar(scoreSoFarNew) {
                var self = this;
                scoreSoFarNew.forEach((score) => {
                    var hostTypeAssociated = self.hostTypes.find((elem) => elem.id == score.id);
                    if (!hostTypeAssociated) {
                        throw `Couldn't find host type in props for val ${score.id}`;
                    }

                    hostTypeAssociated.canChange = score.val == 'None';
                    if (score.val != 'None') {
                        hostTypeAssociated.val = score.val;
                    }
                })
            }
        },
        data() {
            return {
                hostTypes: this.initialHostTypesValues(
                    !this.scoreSoFar ? [] : this.scoreSoFar.filter((s) => s.val != 'None').map((s) => s.val)
                ),
                isBetPlacerVisible: false
            }
        },
        computed: {
            outcomeUid() {
                return this.gameId + "-" + ExactOrderMarket(this.hostTypes.map(ht => ht.val))
            }
        },
        methods: {
            initialHostTypesValues(initialValues) {
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
            canChange(position) {
                if (position < 0 || position > 4) {
                    throw `position out of bounds ${position}`
                }

                var localScore = this.hostTypes.find((elem) => elem.id == position);
                return localScore.canChange
            },
            flip(position) {
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
    .canNotChange {
        border: 1px solid black;
    }

    .canChange {
        cursor: pointer;
    }
</style>