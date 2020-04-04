<template>
    <p>Your money: <b>{{money}}io</b></p>
</template>

<script>
    import Wallet from '../helpers/wallet'
    var wallet = new Wallet()
    export default {
        computed: {
            money: {
                get: function () {
                    return wallet.get()
                },
                set: function (value) {
                    return wallet.set(value)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>