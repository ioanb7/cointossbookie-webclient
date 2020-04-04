<template>
    <Coin v-bind:head="this.item == 'Home'" v-bind:neither="this.item == 'None'" @click="$emit('click')" />
</template>

<script>
    import Coin from './Coin.vue'
    export default {
        components: {
            Coin
        },
        props: ["item"],
    }
</script>