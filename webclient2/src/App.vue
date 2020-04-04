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

  /*
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  body,
  html,
  #root {
    height: 100%;
    background-color: #1a202c;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  #root {
    margin: 0px 30px 0px;
  }

  .market {
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    border: 1px solid rgb(180, 173, 173);
    background-color: white;
    margin: 0px 60px 5px;
  }

  .market header {
    font-size: 1.2em
  }

  .market .outcome {
    width: 48%;
    float: left;
  }

  input[type=text] {
    border: 1px solid black
  }

  .betplacer {
    border: 1px solid orangered;
    padding: 5px;
  }


  .betplacer p {
    margin-bottom: 35px;
  }

  .betplacer a {
    font-size: 1.4em;
  }

  .betplacer input[type=text] {
    max-width: 50px;
    text-align: right;
  }
  */
</style>