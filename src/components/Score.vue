<template>
    <Coin :coinType="coinType" />
</template>

<script>
    import Coin from './Coin.vue'
    export default {
        name: 'Score',
        components: {
            Coin
        },
        props: ["item"],
        computed: {
            coinType() {
                if (this.item == 'Home') {
                    return 'heads';
                }
                if (this.item == 'Away') {
                    return 'tails';
                }
                return ''
            }
        }
    }
</script>