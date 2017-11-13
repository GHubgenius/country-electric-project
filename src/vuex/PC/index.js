/**
 * Created by lenovo on 2017/9/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';
import getters from './getter';
Vue.use(Vuex)
const vuex = new Vuex.Store({
  // 应用初始状态
  namespaced: true,
  state: {
    spId: '', // 企业ID
    groupData: '', // 组织架构
    groupMap: '', // 组织字典
    formStructBasic: {},  // 首个(启用)表单基础结构
    formCheckBasic: {},  // 数据项配置表单数据
    formId: '', // 表单Id
    formGrid: '' // 表单分成几份
  },
  mutations,
  actions,
  getters
})

export default vuex
