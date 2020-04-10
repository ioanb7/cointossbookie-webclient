<template>
    <p>Your money: <b>{{getWallet}}io</b>, counter: {{counter}} {{countValue}} </p>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'getWallet',
                'countValue'
            ])
        },
        data() {
            this.increment(5)
            return {
                counter: this.counter
            }
        },
        methods: {
            ...mapMutations([
                'increment'
            ])
        }
    }
</script>

<style lang="scss" scoped>

</style>