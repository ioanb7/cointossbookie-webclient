<template>
    <div>
        <div>Scoreboard for game {{this.id}}</div>
        <h1 class="text-6xl font-bold text-gray-100 uppercase tracking-wider">
            {{this.fixtureState}}
        </h1>
        <div :key="item.id" v-for="item in this.items">
            <Score v-bind:item="item.val" />
        </div>
    </div>
</template>

<script>
    import Score from './Score.vue'
    export default {
        components: {
            Score
        },
        props: ["items", "id", "fixtureState"]
    }
</script>