import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '/src/plugins/tiptap-vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// const vuetify = new Vuetify()
// Vue.use(Vuetify)
// use this package's plugin
// import { BootstrapVue } from 'bootstrap-vue'
// Vue.use(BootstrapVue)


// import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

// Vue.use(TiptapVuetifyPlugin, { vuetify })


axios.defaults.withCredentials = true;


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)





new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
