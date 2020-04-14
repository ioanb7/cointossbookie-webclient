<template>
    <nav class="flex justify-between bg-teal-500 p-4">
        <div class="flex flex-shrink-0 text-white p-2">
            <svg class="fill-current h-10 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span class="font-semibold h-12 leading-10 text-xl tracking-tight uppercase">Game <span
                    class="game-id">{{this.id}}</span>
                ({{this.fixtureState}})</span>
        </div>
        <div class="flex items-center">
            <div class="text-sm flex-grow">
                <Score v-for="item in this.items" :key="item.id" :item="item.val" />
            </div>
        </div>
        <div class="flex items-center">
            <a href="#"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-0">
                <WalletComponent />
            </a>
        </div>
    </nav>
</template>

<script>
    import WalletComponent from './WalletComponent.vue'
    import Score from './Score.vue' // TODO: use store for this, but this template is not used only for the game.
    export default {
        components: {
            Score,
            WalletComponent
        },
        props: ["items", "id", "fixtureState"]
    }
</script>

<style lang="scss" scoped>
</style>