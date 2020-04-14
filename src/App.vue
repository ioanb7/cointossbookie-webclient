<template>
  <div id="app-cointossbookie">
    <main>
      <MainBetting />
    </main>
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
  #app-cointossbookie {
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    background: url(http://ioanb7.com/wp-content/themes/ioanb7_sys/assets/img/pattern.png);
  }

  // TODO: fix this
  #app-cointossbookie::selection {
    background-color: transparent !important;
  }
</style>