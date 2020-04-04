<template>
  <div id="app">
    <md-content class="md-elevation-3">
      <MainBetting msg="Welcome to Your Vue.js App" />
    </md-content>
  </div>
</template>

<script>
  import MainBetting from './components/MainBetting.vue'

  export default {
    name: 'App',
    components: {
      MainBetting
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  // TODO: fix this
  #app::selection {
    background-color: transparent !important;
  }
</style>