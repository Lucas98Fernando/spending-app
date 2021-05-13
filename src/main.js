import Vue from 'vue'
import App from './App.vue'
import FirebaseVue from './firebase'
import router from './router'
import './utils/directives'

// CSS customizado
import './assets/scss/app.scss'

// Habilitando a utilização do plugin do firebase
Vue.use(FirebaseVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
