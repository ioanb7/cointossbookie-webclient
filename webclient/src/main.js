import Vue from 'vue'
import App from './App.vue'
import store from './store'

import {
  //MdButton,
  MdContent,
  //MdTabs
} from 'vue-material/dist/components'

//import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
//import MyButton from './components/MyButton.vue'

Vue.config.productionTip = false
Vue.use(MdContent)

//Vue.component('MyButton', MyButton);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
