<template>
  <md-button v-bind="{ ...$props, ...$attrs }" class="md-raised md-primary">
    <slot></slot>
  </md-button>
</template>

<script>
  /*
  import {
    MdButton,
    //MdContent,
    //MdTabs
  } from 'vue-material/dist/components'
  export default {
    components: {
      //MdButton
    }
  }
  */
</script>