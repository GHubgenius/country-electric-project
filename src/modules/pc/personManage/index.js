import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from 'src/vuex/PC/index'
import router from 'src/route/routesPC'
import '../../../styles/element-variables.scss'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
