<template>
    <nav class="bg-teal-500 p-4 md:flex md:justify-between">
        <div class="md:flex md:flex-shrink-0 md:p-2 text-white">
            <div class="block">
                <svg class="fill-current h-10 w-8 mr-2 inline-block mb-2" width="54" height="54" viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <p class="font-semibold h-12 leading-10 text-xl my-1 inline-block tracking-tight uppercase">Game
                    <span class="game-id">{{this.id}}</span>
                    ({{this.fixtureState}})</p>
            </div>
        </div>
        <div class="my-0 mx-auto md:flex items-center">
            <div class="text-sm flex-grow">
                <Score v-for="item in this.items" :key="item.id" :item="item.val" />
            </div>
        </div>
        <div class="md:flex items-center py-4">
            <a href="#" @click.prevent="doNothing"
                class="inline-block text-sm px-4 py-2 leading-none border text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-0">
                <WalletComponent />
            </a>
        </div>
    </nav>
</template>

<script>
    // TODO: rename this component to Header
    import WalletComponent from './WalletComponent.vue'
    import Score from './Score.vue' // TODO: use store for this, but this template is not used only for the game.
    export default {
        components: {
            Score,
            WalletComponent
        },
        props: ["items", "id", "fixtureState"],
        methods: {
            doNothing() {
                // 
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>