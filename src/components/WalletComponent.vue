<template>
    <p>Your money: <b>{{getWallet}}io</b></p>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'getWallet'
            ])
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>

</style>