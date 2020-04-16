<template>
    <div class="outcome p-3 m-1" :class="{
        home: outcome.HostType=='Home',
        away: outcome.HostType=='Away',
        statusOpen: isOutcomeStatusOpen,
        statusNotOpen: !isOutcomeStatusOpen,
        'bg-white': isOutcomeStatusOpen}">
        <p>
            <a class="openBetPlacer" @click.prevent='openBetPlacer' href="#">
                <b class="outcomeName">
                    <OutcomeName :outcome="outcome" /></b>
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
    a:visited,
    a:active,
    a:link {
        color: black;
    }

    a {
        text-decoration: none;
    }

    .outcomeName {
        text-decoration: underline;
    }

    .outcome {
        display: inline-block;
        margin-left: 35px;
    }

    .outcome.statusOpen {
        &:hover {
            background-color: blue; // blue by default (home)

            &.away {
                background-color: green; // todo: change colors
            }
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

    .md-layout-item {

        &:after {
            width: 100%;
            height: 100%;
            display: block;
            background: md-get-palette-color(red, 200);
            content: " ";
        }
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