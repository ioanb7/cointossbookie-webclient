<template>
    <div class="marketGroup sm:p-4 sm:m-4 mb-20">
        <header class="bg-white w-full px-3 p-1">
            <h2>{{marketType}}</h2>
        </header>

        <div class="markets">
            <Market v-for="market in this.markets" :key="market.Id" :market="market"></Market>
        </div>

        <p class="font-hairline text-sm mt-10">Note: Click on any selection to bet</p>
    </div>
</template>

<script>
    import Market from './Market.vue'
    export default {
        components: {
            Market
        },
        props: ["markets", "marketType"],
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss">
    .marketGroup {
        min-width: 375px;
        justify-content: space-between;

        header {
            display: inline-block;
        }
    }
</style>