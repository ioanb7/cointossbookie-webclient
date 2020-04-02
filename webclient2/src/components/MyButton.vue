<template>
  <md-button v-bind="{ ...$props, ...$attrs }" class="md-raised md-primary">
    <slot></slot>
  </md-button>
</template>