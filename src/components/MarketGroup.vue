<template>
    <div class="marketGroup">
        <header>
            <h2>{{marketType}}</h2>
        </header>

        <div class="markets">
            <Market v-for="market in this.markets" :key="market.Id" :market="market"></Market>
        </div>
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
        border: 1px solid #ccc;
        margin: 30px;
        background: white;
        padding: 20px;
        width: 350px;
        justify-content: space-between;

        header {
            display: inline-block;
        }
    }
</style>