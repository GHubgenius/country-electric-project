import Vue from 'vue'
import VueRouter from 'vue-router'
import dataConfig from 'src/modules/pc/personManage/views/functionConfig/data'
import countConfig from 'src/modules/pc/personManage/views/functionConfig/countConfig'
import wordConfig from 'src/modules/pc/personManage/views/functionConfig/wordConfig'
import modelConfig from 'src/modules/pc/personManage/views/functionConfig/modelConfig'
import personList from 'src/modules/pc/personManage/views/personList/list'
import importMore from 'src/modules/pc/personManage/views/personList/importMore'
import importDetail from 'src/modules/pc/personManage/views/personList/importDetail'
import addPerson from 'src/modules/pc/personManage/views/personList/addPerson'
import personCount from 'src/modules/pc/personManage/views/personCount/index'
Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dataConfig'
    },
    {
      path: '/dataConfig',
      component: dataConfig,
      name: 'dataConfig',
      meta: {title: '数据项配置'}
    },
    {
      path: '/countConfig',
      component: countConfig,
      name: 'countConfig',
      meta: {title: '统计配置'}
    },
    {
      path: '/wordConfig',
      component: wordConfig,
      name: 'wordConfig',
      meta: {title: '文案配置'}
    },
    {
      path: '/modelConfig',
      component: modelConfig,
      name: 'modelConfig',
      meta: {title: '模板配置'}
    },
    {
      path: '/personList',
      component: personList,
      name: 'personList',
      meta: {title: '人员列表'}
    },
    {
      path: '/importMore',
      component: importMore,
      name: 'importMore',
      meta: {title: '批量导入'}
    },
    {
      path: '/importDetail',
      component: importDetail,
      name: 'importDetail',
      meta: {title: '导入详情'}
    },
    {
      path: '/addPerson',
      component: addPerson,
      name: 'addPerson',
      meta: {title: '新增人员'}
    },
    {
      path: '/personCount',
      component: personCount,
      name: 'personCount',
      meta: {title: '人员统计'}
    }
  ]
})
