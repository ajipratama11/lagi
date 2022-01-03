import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import Vuelidate from 'vuelidate'
import VueCompositionAPI from '@vue/composition-api'
import "./assets/app.css";



Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
