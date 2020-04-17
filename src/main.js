import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/css/tailwind.css'

console.log(`Current environment is: ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV === 'production') {
  Vue.config.silent = true;
} else {
  Vue.config.productionTip = false
}

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app-cointossbookie')
