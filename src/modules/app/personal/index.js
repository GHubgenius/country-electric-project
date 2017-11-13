import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../../../styles/app/style.css'
import '../../../styles/app/public.scss'
import App from './App'
import router from 'src/route/routesApp'
import 'lib-flexible'
import fastclick from 'fastclick'

fastclick.attach(document.body)
Vue.use(Mint);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
