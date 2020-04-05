<template>
    <Coin :coinType="coinType" />
</template>

<script>
    import Coin from './Coin.vue'
    export default {
        components: {
            Coin
        },
        props: ["item"],
        computed: {
            coinType() {
                if (this.item == 'Home') {
                    return 'head';
                }
                if (this.item == 'Away') {
                    return 'tail';
                }
                return ''
            }
        }
    }
</script>