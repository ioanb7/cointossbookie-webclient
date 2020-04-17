<template>
    <div class="outcome mx-1" :class="{
        home: outcome.HostType=='Home',
        away: outcome.HostType=='Away',
        statusOpen: isOutcomeStatusOpen,
        statusNotOpen: !isOutcomeStatusOpen,
        'bg-white': isOutcomeStatusOpen}">
        <p class="inline-block text-xs">
            <a class="openBetPlacer p-6 py-6 inline-block" @click.prevent='openBetPlacer' href="#">
                <span class="outcomeName">
                    <OutcomeName :outcome="outcome" />
                </span>
                <span class="price">{{price}}</span>
            </a>
        </p>
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    import OutcomeName from './OutcomeName'

    export default {
        name: 'Outcome',
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
            OutcomeName
        },
        computed: {
            price() {
                return this.outcome.TrueProbability * 0.95
            },
        },
        methods: {
            ...mapMutations(['addOrReplaceBetPlacer']),
            openBetPlacer() {
                if (!this.isOutcomeStatusOpen) {
                    return;
                }
                this.addOrReplaceBetPlacer({
                    outcomeId: this.outcome.Uid,
                    price: this.price
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outcome.statusOpen {

        a:visited,
        a:active,
        a:link {
            color: black;
            background-color: white;
        }

        a:hover {
            color: white;
            background-color: black;
        }
    }

    a {
        text-decoration: none;
    }

    .outcomeName {}

    .outcome {
        display: inline-block;
        margin-left: 35px;
    }

    .outcome.statusOpen {
        &:hover {
            //color: white;
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

    .statusNotOpen .outcomeName,
    .statusNotOpen .price {
        visibility: hidden;

        &:hover {}
    }

    .statusNotOpen a:hover {
        cursor: inherit
    }
</style>