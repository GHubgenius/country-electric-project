import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'modules/app/personal/views/main'
import Detail from 'modules/app/personal/views/detail'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [{
    path: '/',
    component: Index,
    name: 'index',
    meta: {title: '概览', index: '1'}
  }, {
    path: '/Detail',
    component: Detail,
    name: 'Detail',
    meta: {title: '详情', index: '2'}
  }
  ]
})
