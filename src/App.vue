<template>
  <div id="app-cointossbookie">
    <main>
      <MainBetting />
    </main>
  </div>
</template>

<script>
  import MainBetting from './components/MainBetting.vue'
  import {
    mapMutations,
  } from 'vuex'

  export default {
    name: 'App',
    components: {
      MainBetting
    },
    created() {
      this.setUpHub()
    },
    methods: {
      ...mapMutations(['setUpHub']),
    },
  }
</script>

<style lang="scss">
  #app-cointossbookie {
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    background: url(http://ioanb7.com/wp-content/themes/ioanb7_sys/assets/img/pattern.png);
    min-width: 480px;

    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;

    /*
    Introduced in Internet Explorer 10.
    See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
    */
    -ms-user-select: none;
    user-select: none;
  }

  #app-cointossbookie::selection {
    background-color: white !important;
  }
</style>