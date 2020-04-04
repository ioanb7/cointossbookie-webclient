<template>
    <span class="coin" @click="$emit('click')">
        <img v-if="head" src="https://img.icons8.com/dotty/80/000000/fan-head.png" />
        <img v-else-if="!neither" src="https://img.icons8.com/dotty/80/000000/tail-of-whale.png" />
        <span v-else class="neither">?</span>
    </span>
</template>
<script>
    export default {
        props: ["head", "neither"]
    }
</script>

<style lang="scss" scoped>
    .coin {
        width: 50px;
        height: 50px;
        display: inline-block;
    }

    img,
    .neither {
        width: 50px;
        height: 50px;
        vertical-align: middle;
    }

    img {
        display: inline-block;
    }

    .neither {
        background-color: #ccc;
        text-align: center;
        display: table-cell;
    }
</style>