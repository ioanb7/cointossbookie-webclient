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

<style lang="scss" scoped>
    .marketGroup {
        border: 1px solid black;
        float: left;
        margin: 30px;
        border-radius: 20px 0px;
        box-shadow: 0px -3px 10px rgb(165, 165, 165);
        background: white;
        padding: 20px;
    }

    header {
        display: inline-block;
    }
</style>